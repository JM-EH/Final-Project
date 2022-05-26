import * as React from "react";
import {useParams} from "react-router-dom";
import ProductDetail from '../Components/ProductDetail';

export default function ProductById() {
  const { productId } = useParams();

  return <ProductDetail id={productId} key={productId} />
}