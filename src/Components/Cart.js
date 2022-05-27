import React, { Component } from 'react';
import axios from 'axios'

import "../style.css"

class Cart extends Component {
    constructor() {
        super();
        this.state = { cartProducts: [], error: '' };
      }
      addQuantity(product){
          const index = this.state.cartProducts.indexOf(product);
          const cartProductsCopy = this.state.cartProducts

          cartProductsCopy[index].quantity++
          this.setState({cartProducts:cartProductsCopy})
          
      }

      removeQuantity(product){
        const index = this.state.cartProducts.indexOf(product);
        const cartProductsCopy = this.state.cartProducts
        if(cartProductsCopy[index].quantity >1){
            cartProductsCopy[index].quantity--
        }
       
        this.setState({cartProducts:cartProductsCopy})
      }
      
      removeElement(product,index){
        const cartProductsCopy = this.state.cartProducts
        cartProductsCopy.splice(index, 1);
        
        fetch('https://dummyjson.com/carts/8', {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            products: cartProductsCopy
        })
        })
        .then(async (res) => {
            this.setState({cartProducts:cartProductsCopy})
        })
       

       
      }
      fetch = async () => {
        const userId = 1
        const baseURL = `https://dummyjson.com/carts/user/${userId}`;
        try {
          const response = await axios.get(`${baseURL}`);
          this.setState({ cartProducts:response.data.carts[0].products });
        } catch (error) {
          this.setState({ error: error });
        }
      };
    
      componentDidMount() {
        this.fetch();
      }
    
    render(){

        return (
          <div>
              <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Parice</th>
                    <th>Total</th>
                </tr>
                </thead>  
                <tbody>
                    {this.state.cartProducts.map((product,index) =>( 
                      <tr key={index}>
                            <td key={index}>Name: {product.title}</td>
                            <td>Quantity: {product.quantity}</td>
                            <td>Price: {product.price}</td>
                            <td>Total: {product.total}</td>
                            <td >
                                <button onClick={this.removeQuantity.bind(this,product)}>-</button>
                                <button onClick={this.removeElement.bind(this,product,index)}>Remove</button>
                                <button  onClick={this.addQuantity.bind(this,product)}>+</button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
              </table>

              <button >Check Out</button>
          </div>
        )
    }
}

export default Cart