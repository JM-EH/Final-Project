import React, { Component } from 'react';

import {
  Grid,
  List,
  ListItem,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material/';

import axios from 'axios';
import { Link } from 'react-router-dom';

class ProductList extends Component {

  
  constructor() {
    super();
    this.state = { products: [], error: '', limit: -1,strinSearch:'',originalProducts:[] };
  }

  handleSearchChange(e){
    const textValue = e.target.value
    let productsCopy = this.state.products

    if(textValue.length >=3){
      productsCopy = this.state.originalProducts.filter(product =>{
        return (product.title.toLowerCase().includes(textValue.toLowerCase()))
  
      })
      this.setState({products:productsCopy})
    }
  }

  fetch = async (
    limit = 30,
    query = '',
    random = false,
    category = '',
    select = []
  ) => {
    const s = !select.length ? '' : `&select=${select.join(',')}`;
    const skip =
      random && query === ''
        ? `&skip=${Math.floor(Math.random() * (100 - limit))}`
        : '';
    const l = `&limit=${limit}`;
    const q = query !== '' && category === '' ? `/search?q=${query}` : '?';
    const cat = category !== '' && query === '' ? `/category/${category}` : '?';

    const baseURL = 'https://dummyjson.com/products';
    const requestURL = `${baseURL}${cat}${q}${l}${skip}${s}`;
    //console.log(requestURL)
    try {
      const response = await axios.get(requestURL);
      const products = response.data.products;
      const responseLimit = response.data.limit;
      this.setState({ products: products, limit: responseLimit });
      this.setState({originalProducts:products, limit: responseLimit})
    } catch (error) {
      this.setState({ error: error });
    }
  };

  componentDidMount() {
    this.fetch(
      this.props.limit,
      this.props.query,
      this.props.random,
      this.props.category,
      this.props.select
    );
  }

  render() {
    const allFeatures =
      this.props.select === undefined || this.props.select.length == 0;
    const hasTitle = allFeatures || this.props.select.includes('title');
    const hasThumbnail = allFeatures || this.props.select.includes('thumbnail');
    const hasDescription =
      allFeatures || this.props.select.includes('description');

    const features = !allFeatures ? [...this.props.select] : [];
    const paramCols = parseInt(this.props.cols, 10);
    let cols = this.props.cols !== undefined ? paramCols : this.state.cols;
    cols = cols > this.state.cols ? this.state.cols : cols;

    let productList = '';

    if (hasThumbnail) {
      features.splice(features.indexOf('thumbnail'), 1);

      productList = (
        <ImageList cols={cols}>
          {this.state.products.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <ImageListItem key={product.thumbnail}>
                <img
                  style={{ width: '100%', height: '400px' }}
                  src={product.thumbnail}
                  alt={hasTitle ? product.title : ''}
                  loading="lazy"
                />
                <ImageListItemBar
                  //title, first feature, or empty
                  title={
                    hasTitle
                      ? product.title
                      : !features.length
                      ? ''
                      : `${features[0]}: 
                              ${product[features[0]]}`
                  }
                  //description, second feature, or empty
                  subtitle={
                    hasDescription
                      ? product.description
                      : features.length <= 1
                      ? ''
                      : `${features[1]}: ${product[features[1]]}`
                  }
                />
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      );
    } else {
      productList = (
        <Grid container spacing={2}>
          {this.state.products.map((product) => (
            <Grid item xs={3} key={product[features[0]]}>
              <List>
                {features.map((feature) => (
                  <ListItem>{`${feature}: ${product[feature]}`}</ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
      );
    }

    return <div id="productList">
       Search: <input type="text" onChange={this.handleSearchChange.bind(this)}></input>

      {productList}</div>;
  }
}

export default ProductList;
