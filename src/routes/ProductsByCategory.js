import * as React from "react";
import {useParams} from "react-router-dom";
import ProductList from '../Components/ProductList';

import {
        Box,
        Typography
        } from '@mui/material/';

export default function ProductDetailRoute() {
  const { categoryName } = useParams();

  return (
        <Box>
          <Typography variant="h1" component="div" gutterBottom>
            {categoryName.toUpperCase()}
          </Typography> 
          <ProductList cols="4"
                        category={categoryName} 
                        key={categoryName} /> 
        </Box>
    )
}