import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { products } from "./data.json";
import { Route, Switch } from "react-router";
import Shop from "./Routes/Shop";
import ProductPage from "./Routes/ProductPage/ProductPage";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { useState } from "react";
import Cart from "./Routes/Cart/Cart.jsx";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const newItems = [...cartItems];
    let newItem = { ...item, amount: 1 };
    newItems.push(newItem);
    setCartItems(newItems);
    console.log(newItems);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route
            path="/shop"
            render={() => <Shop products={products} addToCart={addToCart} />}
          />
          <Route path="/cart" render={() => <Cart cartItems={cartItems} />} />
          <Route
            path="/:id"
            render={() => <ProductPage addToCart={addToCart} />}
          />
        </Switch>
      </main>

      <Footer />
    </div>
  );
}

export default App;
