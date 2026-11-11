import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";


function NavBar(props) {

  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        🔥 Ember
      </Link>

      <div className={menuOpen ? "nav-links open" : "nav-links"}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/menu" onClick={closeMenu}>Menu</NavLink>
        <NavLink to="/track" onClick={closeMenu}>Track Order</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
      </div>

      <div className="nav-buttons">
        <button
          className="icon-btn"
          onClick={props.toggleDarkMode}
          title="Dark mode"
        >
          {props.darkMode ? "☀️" : "🌙"}
        </button>

        <Link to="/cart" className="cart-btn" onClick={closeMenu}>
          🛒 Cart
          {props.cartCount > 0 && (
            <span className="cart-count">{props.cartCount}</span>
          )}
        </Link>

        <button
          className="icon-btn menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          title="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
