import React from 'react';
import './App.css';
var createReactClass = require('create-react-class');

var Product = createReactClass({

  getInitialState : function(){
    return {
      name : this.props.name,
      price : this.props.price,
      qut : 0
    }
  },

  buy : function(){
    this.setState({
      qut : this.state.qut+1
    })
    this.props.handlePrice(this.props.price)
  },
  show : function(){
    alert("something should be place here")
  },
  render : function(){
    const mystyle = {
      color: "black",
      backgroundColor: "WhiteSmoke",
      padding: "10px",
      width : "500px",
      fontFamily: "Arial"
    };
    return(
      
      <div style = {mystyle}>
        <p> {this.props.name} - ${this.props.price}</p>
        <button className="btn btn-primary" style = {{marginRight : "2px"}}onClick = {this.buy}>Buy</button>
        <button className="btn btn-success" onClick = {this.show}>Show</button>
        <p>Qut : {this.state.qut} </p>
      </div>
    )
  }
})

var Total = createReactClass({
  render : function(){
    return(
      <div>
        <h4>Total is : ${this.props.total}</h4>
      </div>
    )
  }

})

var ProductForm = createReactClass({


  submit : function(e){
    e.preventDefault();
    var newProduct = {
      name  :this.refs.name.value ,
      price :this.refs.price.value
    }
    this.props.addProduct(newProduct);
    this.refs.name.value = "";
    this.refs.price.value = ""
  },

  render : function(){
    let formStyle = {
      width : "25%"
    };
    return(
      <div style = {{marginTop : "1%"}}>
        <h4>Add new product</h4>
        <form onSubmit = {this.submit}>
           <input type ="text" className = "form-control" style = {formStyle} placeholder = "product name" ref = "name"/>
           <br />
           <input type ="text" className = "form-control" style = {formStyle}  placeholder = "product price" ref = "price"/> 
          <br/>
          <button className="btn btn-primary">Create product</button>    
        </form>
      </div>
    )
  }
})

var ProductList = createReactClass({

  getInitialState(){
    return {
      total : 0,
      products : [
        {name : "Android" , price : 100},
        {name : "Apple" , price : 1000},
        {name : "Sony" , price : 500}
      ]
    }
  },
  addProduct : function(newProduct){
    this.setState({
      products : this.state.products.concat(newProduct)
    })
  },
  calculateTotal : function(price){
    this.setState({
      total : this.state.total + price
    })
  },
  render : function () {

    var component = this;
    var products = this.state.products.map(function(pro){
      return <Product name = {pro.name} price = {pro.price} key = {pro.name} handlePrice = {component.calculateTotal}/>
    })
    return(
      <div style = {{marginLeft : "2%"}}>
        <ProductForm addProduct = {this.addProduct}/>
        <hr></hr>
        {products}
        <hr></hr>
        <Total total = {this.state.total}/>

      </div>
    )
  }
})



export default ProductList;
