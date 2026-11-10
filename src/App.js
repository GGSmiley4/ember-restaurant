import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { CheckIcon } from './components/Icons';
import Home from './pages/Home';
import Menu from './pages/Menu';
import DishDetail from './pages/DishDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import TrackLookup from './pages/TrackLookup';
import OrderTracking from './pages/OrderTracking';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';


function loadCart() {
  const saved = JSON.parse(localStorage.getItem('ember-cart'));
  if (Array.isArray(saved)) {
    return saved;
  }
  return [];
}


function loadTheme() {
  const saved = localStorage.getItem('ember-theme');
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function App() {
 
  const [cart, setCart] = useState(loadCart());
  const [theme, setTheme] = useState(loadTheme());
  const [message, setMessage] = useState(''); 

 

 
  function saveCart(newCart) {
    setCart(newCart);
    localStorage.setItem('ember-cart', JSON.stringify(newCart));
  }

  function addToCart(dish, qty) {
    const existing = cart.find((item) => item.id === dish.id);

    if (existing) {
     
      const newQty = Math.min(existing.qty + qty, 20);
      saveCart(cart.map((item) => (item.id === dish.id ? { ...item, qty: newQty } : item)));
    } else {
      saveCart([...cart, { ...dish, qty: qty }]);
    }
  }

  function changeQty(id, qty) {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      saveCart(cart.map((item) => (item.id === id ? { ...item, qty: qty } : item)));
    }
  }

  function removeFromCart(id) {
    saveCart(cart.filter((item) => item.id !== id));
  }

  function clearCart() {
    saveCart([]);
  }

  
  let count = 0;
  cart.forEach((item) => {
    count = count + item.qty;
  });

  

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('ember-theme', newTheme);
  }

  

  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(''), 2500); 
  }

  return (
    
    <div className="app" data-theme={theme}>
      <ScrollToTop />
      <Navbar count={count} theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/menu"
            element={<Menu cart={cart} addToCart={addToCart} changeQty={changeQty} showMessage={showMessage} />}
          />
          <Route
            path="/menu/:dishId"
            element={<DishDetail cart={cart} addToCart={addToCart} changeQty={changeQty} showMessage={showMessage} />}
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} changeQty={changeQty} removeFromCart={removeFromCart} clearCart={clearCart} />}
          />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
          <Route path="/track" element={<TrackLookup />} />
          <Route path="/track/:orderId" element={<OrderTracking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {message && (
        <div className="toast-stack">
          <div className="toast">
            <span className="toast-icon">
              <CheckIcon size={16} />
            </span>
            {message}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
