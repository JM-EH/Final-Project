import React, { Component } from 'react';

import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material/';

import axios from 'axios';
import { Link } from 'react-router-dom';

class CategoryList extends Component {
  constructor() {
    super();
    this.state = { categories: [], error: '' };
  }

  fetch = async () => {
    const baseURL = 'https://dummyjson.com/products';
    try {
      const response = await axios.get(`${baseURL}/categories`);
      const categories = [];
      response.data.map(async (category) => {
        const requestURL = `${baseURL}/category/${category}?limit=1&select=thumbnail`;
        const response = await axios.get(requestURL);

        categories.push({
          category: category,
          thumbnail: response.data.products[0].thumbnail,
        });
        categories.sort((a, b) => a.category.localeCompare(b.category));
        this.setState({ categories: categories });
      });
    } catch (error) {
      this.setState({ error: error });
    }
  };

  componentDidMount() {
    this.fetch();
  }

  render() {
    return (
      <div id="categoryList">
        <ImageList cols={4}>
          {this.state.categories.map((item) => (
            <Link to={`/categories/${item.category}`} key={item.category}>
              <ImageListItem key={item.category}>
                <img
                  style={{ width: '100%', height: '300px' }}
                  src={item.thumbnail}
                  alt={item.category}
                  loading="lazy"
                />
                <ImageListItemBar title={item.category} />
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      </div>
    );
  }
}

export default CategoryList;
