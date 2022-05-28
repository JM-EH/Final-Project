import React, { Component } from 'react';

import App from '../App';
import NavBar from '../Components/NavBar';
import NotFound from '../Components/NotFound';
import ProductList from '../Components/ProductList';
import CategoryList from '../Components/CategoryList';

import ProductById from './ProductById';
import ProductsByCategory from './ProductsByCategory';
import Cart from '../Components/Cart';
import CheckOut from '../Components/CheckOut';

import {
    Route,
    Routes,  
    useParams,
    BrowserRouter,
  } from "react-router-dom";

class IndexRouter extends Component {
    constructor() {
      super();
    }

    render(){
        return (
            <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<App/>} />          
                <Route path="products" element={<ProductList random={true} cols="3" limit="6"/>} />
                <Route path="products/:productId" element={<ProductById />} />
                <Route path="categories" element={<CategoryList />} />
                <Route path="categories/:categoryName" element={<ProductsByCategory />} />
                <Route path="cart" element={<Cart/>}/>
                <Route path="checkout" element={<CheckOut/>}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
            </BrowserRouter>
        )
    }

}
export default IndexRouter;