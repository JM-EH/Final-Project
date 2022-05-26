import axios from 'axios';
import React, { Component } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material/';

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = { product: null };
  }

  fetch = async () => {
    const baseURL = 'https://dummyjson.com/products';
    try {
      const response = await axios.get(`${baseURL}/${this.props.id}`);
      this.setState({ product: response.data });
    } catch (error) {
      this.setState({ error: error });
    }
  };

  componentDidMount() {
    this.fetch();
  }

  render() {
    if (this.state.product === null) {
      return <div id="productDetail">Loading...</div>;
    } else {
      const index = Math.floor(
        Math.random() * this.state.product.images.length
      );
      return (
        <div id="productDetail">
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="300"
              image={this.state.product.images[index]}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {this.state.product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {this.state.product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Brand: {this.state.product.brand}
              </Typography>
              <Typography variant="body2" color="warning.main">
                Price: ${this.state.product.price}
              </Typography>
              <Typography variant="body2" color="error.main">
                Discount: $
                {Math.floor(
                  (this.state.product.price *
                    this.state.product.discountPercentage) /
                    100
                )}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="large">Add to cart</Button>
            </CardActions>
          </Card>
        </div>
      );
    }
  }
}

export default ProductDetail;
