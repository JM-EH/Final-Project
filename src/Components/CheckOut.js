import React, { Component } from 'react';
import axios from 'axios'

import "../style.css"

class CheckOut extends Component {
    constructor() {
        super();
        this.state = { cartProducts: [], error: '' };
      }
      
      submit(e){
        e.preventDefault()
        alert("Order Posted")

      }

      render(){
          return (
              <div style={{textAlign:"center",justifyContent:"center"}}>
                  <form>
                     <div>
                     Name: <input/>
                     </div>
                     <br></br>
                     <div>
                     Address: <input/>
                     </div>
                     <br></br>
                     <div>
                     Payment Method: <input/>
                     </div>
                     <br></br>
                     <div>
                     <button onClick={this.submit}>Submit</button>
                     </div>
                  </form>
              </div>
          )
      }
}

export default CheckOut