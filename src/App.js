import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import { db } from "./firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection("products").onSnapshot((snapshot) => {
      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });

      this.setState({
        products,
        loading: false,
      });
    });
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
      });
  };

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty <= 1) {
      this.handleDeleteProduct(products[index].id);
      return;
    }

    const docRef = db.collection("products").doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty - 1,
      })
      .then(() => {
        console.log("Updated successfully!");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  handleDeleteProduct = (id) => {
    const docRef = db.collection("products").doc(id);

    docRef
      .delete()
      .then(() => {
        console.log("Deleted successfully!");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  getCartCount = () => {
    const { products } = this.state;
    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });
    return count;
  };

  getCartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;

    products.forEach((product) => {
      if (product.qty > 0) {
        cartTotal += product.qty * product.price;
      }
    });
    return cartTotal;
  };

  addProduct = (newProduct) => {
    const { products } = this.state;
    const existingProduct = products.find(
      (product) => product.title === newProduct.title
    );

    if (existingProduct) {
      this.handleIncreaseQuantity(existingProduct);
    } else {
      db.collection("products")
        .add(newProduct)
        .then((docRef) => {
          console.log(`${newProduct.title} has been added!`, docRef);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  addWashingMachine = () => {
    this.addProduct({
      title: "Washing machine",
      price: 40000,
      qty: 1,
      img: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FzaGluZyUyMG1hY2hpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    });
  };

  addCamera = () => {
    this.addProduct({
      title: "Camera",
      price: 90000,
      qty: 1,
      img: "https://images.unsplash.com/photo-1516852294404-5423eaa0d4a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODV8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    });
  };

  addBag = () => {
    this.addProduct({
      title: "Bag",
      price: 1999,
      qty: 1,
      img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z3VjY2klMjBiYWd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    });
  };

  addMobilePhone = () => {
    this.addProduct({
      title: "Mobile Phone",
      price: 25000,
      qty: 1,
      img: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vYmlsZSUyMHBob25lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    });
  };

  addWatch = () => {
    this.addProduct({
      title: "Watch",
      price: 1999,
      qty: 1,
      img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    });
  };

  addLaptop = () => {
    this.addProduct({
      title: "Laptop",
      price: 200000,
      qty: 1,
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBsYXB0b3B8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    });
  };

  render() {
    const { products, loading } = this.state;

    return (
      <div className="App">
        <div className="Navbar">
          <Navbar count={this.getCartCount()} />
        </div>

        <button
          onClick={this.addWashingMachine}
          style={{
            background: "rgb(246 129 129)",
            fontWeight: "bold",
            padding: 10,
            margin: 10,
            fontSize: 16,
          }}
        >
          Washing Machine
        </button>
        <button
          onClick={this.addCamera}
          style={{
            background: "rgb(246 129 129)",
            fontWeight: "bold",
            padding: 10,
            margin: 10,
            fontSize: 16,
          }}
        >
          Camera
        </button>
        <button
          onClick={this.addBag}
          style={{
            background: "rgb(246 129 129)",
            fontWeight: "bold",
            padding: 10,
            margin: 10,
            fontSize: 16,
          }}
        >
          Bag
        </button>
        <button
          onClick={this.addMobilePhone}
          style={{
            background: "rgb(246 129 129)",
            fontWeight: "bold",
            padding: 10,
            margin: 10,
            fontSize: 16,
          }}
        >
          Mobile Phone
        </button>
        <button
          onClick={this.addWatch}
          style={{
            background: "rgb(246 129 129)",
            fontWeight: "bold",
            padding: 10,
            margin: 10,
            fontSize: 16,
          }}
        >
          Watch
        </button>
        <button
          onClick={this.addLaptop}
          style={{
            background: "rgb(246 129 129)",
            fontWeight: "bold",
            padding: 10,
            margin: 10,
            fontSize: 16,
          }}
        >
          Laptop
        </button>

        <div className="cart-container">
          <Cart
            products={products}
            onIncreaseQuantity={this.handleIncreaseQuantity}
            onDecreaseQuantity={this.handleDecreaseQuantity}
            onDeleteProduct={this.handleDeleteProduct}
          />
        </div>

        {loading && <h1>Loading...</h1>}

        <div className="total-container">TOTAL: Rs {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
