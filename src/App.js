import React from 'react';
import NavBar from './Components/NavBar';
import ProductList from './Components/ProductList';

function App() {
  return (
    <div>
      <h1>Product Catalog</h1>
      <ProductList random={true} cols="5" limit="30" />
    </div>
  );
}

export default App;
