import React, { useState } from "react";
// We use HashRouter instead of BrowserRouter because the site is hosted on
// GitHub Pages. With BrowserRouter, refreshing a page like /menu gives a 404 there.
import { HashRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles/App.css";

// localStorage only stores text, so we turn our data into text with
// JSON.stringify() when saving and back into data with JSON.parse() when loading.
function loadFromStorage(key, defaultValue) {
  const saved = localStorage.getItem(key);
  if (saved === null) {
    return defaultValue;
  }
  return JSON.parse(saved);
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function App() {
  const [cart, setCart] = useState(loadFromStorage("cart", []));
  const [order, setOrder] = useState(loadFromStorage("order", null));
  const [darkMode, setDarkMode] = useState(loadFromStorage("darkMode", false));

  // Every time the cart changes we update the state AND save it.
  function updateCart(newCart) {
    setCart(newCart);
    saveToStorage("cart", newCart);
  }

  function addToCart(dish) {
    const itemInCart = cart.find((item) => item.id === dish.id);

    if (itemInCart) {
      // Already in the cart: add 1 to its quantity
      const newCart = cart.map((item) =>
        item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateCart(newCart);
    } else {
      // Not in the cart yet: add it with quantity 1
      updateCart([...cart, { ...dish, quantity: 1 }]);
    }
  }

  function changeQuantity(id, amount) {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + amount } : item
    );
    // Remove any item whose quantity went down to 0
    updateCart(newCart.filter((item) => item.quantity > 0));
  }

  function removeFromCart(id) {
    updateCart(cart.filter((item) => item.id !== id));
  }

  // Called by the Checkout page when the form is valid
  function placeOrder(newOrder) {
    setOrder(newOrder);
    saveToStorage("order", newOrder);
    updateCart([]); // empty the cart
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    saveToStorage("darkMode", !darkMode);
  }

  // Total number of items, shown on the cart button in the navbar
  let cartCount = 0;
  cart.forEach((item) => {
    cartCount = cartCount + item.quantity;
  });

  return (
    <HashRouter>
      <div className={darkMode ? "app dark" : "app"}>
        <NavBar
          cartCount={cartCount}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main>
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  changeQuantity={changeQuantity}
                  removeFromCart={removeFromCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} placeOrder={placeOrder} />}
            />
            <Route path="/track" element={<TrackOrder order={order} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
