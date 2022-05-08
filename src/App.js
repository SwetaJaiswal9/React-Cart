import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import {db} from "./firebase";

class App extends React.Component{
  
    constructor() {
      super();
        this.state = {
          products: [],
          loading: true
        }
    }

    componentDidMount(){
    
      db
        .collection('products')
        .onSnapshot((snapshot) =>{

          const products = snapshot.docs.map( (doc) => {
                const data = doc.data();
                data['id'] = doc.id;
                return data;
              })

          this.setState({
            products, 
            loading: false
          })
         })
        }

    handleIncreaseQuantity = (product) => {

        const { products } = this.state;
        const index = products.indexOf(product);

        const docRef = db.collection("products").doc(products[index].id);

        docRef
            .update({
              qty: products[index].qty + 1,
            })
            .then(() => {
              console.log("Updated successfully!");
            })
            .catch((error) => {
              console.log("Error: ", error);
            })
          }

    handleDecreaseQuantity = (product) => {

        const { products } = this.state;
        const index = products.indexOf(product);

        const newProducts = [...products];
        newProducts[index] = {...newProducts[index], qty: newProducts[index].qty-1}
        this.setState({products: newProducts});
        console.log(newProducts)

        if ( newProducts[index].qty <= 0 ){
             this.handleDeleteProduct(newProducts[index].id);
        }
      
        const docRef = db.collection("products").doc(newProducts[index].id);

        docRef
            .update({
              qty: newProducts[index].qty
            })
            .then(() => {
              console.log("Updated successfully!");
            })
            .catch((error) => {
              console.log("Error: ", error);
            })
          }

    handleDeleteProduct = (id) => {

        const { products } = this.state;

        const docRef = db.collection("products").doc(id);

        docRef
            .delete()
            .then(() => {
              console.log("Updated successfully!");
            })
            .catch((error) => {
              console.log("Error: ", error);
            })
           }

    getCartCount = () => {

      const { products } =this.state;
      let count = 0;

      products.forEach((product) => {

         count += product.qty;
      })
      return count;
    }

    getCartTotal = () =>{

      const { products } =this.state;
      let cartTotal = 0;

      products.map((product) => {

        if(product.qty > 0){
         cartTotal += product.qty * product.price;
        }   
      });
      return cartTotal;
    }

    addWashingMachine(){

      db
        .collection("products")
        .add({
          title: "Washing machine",
          price: 40000,
          qty: 1,
          img:'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FzaGluZyUyMG1hY2hpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
          })
          .then((docRef) => {
            console.log("Product has been added!", docRef);
          })
          .catch((error) => {
            console.log("Error: ", error);
          }) 
        }

    addCamera(){

      db
        .collection("products")
        .add({
          title: "Camera",
          price: 90000,
          qty: 1,
          img:'https://images.unsplash.com/photo-1516852294404-5423eaa0d4a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODV8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
          })
          .then((docRef) => {
            console.log("Camera has been added!", docRef);
          })
          .catch((error) => {
            console.log("Error: ", error);
          }) 
        }

    addBag(){

      db
        .collection("products")
        .add({
          title: "Bag",
          price: 1999,
          qty: 1,
          img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z3VjY2klMjBiYWd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
          })
          .then((docRef) => {
            console.log("Bag has been added!", docRef);
          })
          .catch((error) => {
            console.log("Error: ", error);
          }) 
         }

    addMobilePhone(){

      db
        .collection("products")
        .add({
          title: "Mobile Phone",
          price: 25000,
          qty: 1,
          img:'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vYmlsZSUyMHBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
          })
          .then((docRef) => {
            console.log("Mobile Phone has been added!", docRef);
          })
          .catch((error) => {
            console.log("Error: ", error);
          }) 
         }

    addWatch(){

      db
        .collection("products")
        .add({
          title: "Watch",
          price: 1999,
          qty: 1,
          img:'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
          })
          .then((docRef) => {
            console.log("Watch has been added!", docRef);
          })
          .catch((error) => {
            console.log("Error: ", error);
          }) 
         }

    addLaptop(){

      db
        .collection("products")
        .add({
          title: "Laptop",
          price: 200000,
          qty: 1,
          img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBsYXB0b3B8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
          })
          .then((docRef) => {
            console.log("Laptop has been added!", docRef);
          })
          .catch((error) => {
            console.log("Error: ", error);
          }) 
         }

   render(){

    const { products, loading } = this.state;

          return (
            <div className="App">

              <Navbar count = {this.getCartCount()} />

              <button onClick={this.addWashingMachine} style={{ background:'rgb(246 129 129)', fontWeight:'bold', padding:10, margin:10, fontSize:16 }}> Washing Machine </button>
              <button onClick={this.addCamera} style={{ background:'rgb(246 129 129)', fontWeight:'bold', padding:10, margin:10, fontSize:16 }}> Camera </button>
              <button onClick={this.addBag} style={{ background:'rgb(246 129 129)', fontWeight:'bold', padding:10, margin:10, fontSize:16 }}> Bag </button>
              <button onClick={this.addMobilePhone} style={{ background:'rgb(246 129 129)', fontWeight:'bold', padding:10, margin:10, fontSize:16 }}> Mobile Phone </button>
              <button onClick={this.addWatch} style={{ background:'rgb(246 129 129)', fontWeight:'bold', padding:10, margin:10, fontSize:16 }}> Watch </button>
              <button onClick={this.addLaptop} style={{ background:'rgb(246 129 129)', fontWeight:'bold', padding:10, margin:10, fontSize:16 }}> Laptop </button>

              <Cart
                products = {products}
                onIncreaseQuantity = {this.handleIncreaseQuantity}
                onDecreaseQuantity = {this.handleDecreaseQuantity}
                onDeleteProduct = {this.handleDeleteProduct}
               />
               
               { loading && <h1> Loading... </h1>}

               <div style={{padding: 8, marginTop: 12, background: 'yellow', fontWeight:'bold', fontSize: 25}}> TOTAL: Rs {this.getCartTotal()} </div>

            </div>
          );         
        }
    }


export default App;
