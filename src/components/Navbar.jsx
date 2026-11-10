import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { CartIcon, CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/track', label: 'Track Order' },
];


function Navbar({ count, theme, toggleTheme }) {
  const [open, setOpen] = useState(false); 

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <Logo />
          <span className="brand-name">Ember</span>
        </Link>

        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end className="nav-link" onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button type="button" className="icon-btn theme-toggle" onClick={toggleTheme} title="Light / dark mode">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link to="/cart" className="icon-btn cart-btn" title="Cart" onClick={closeMenu}>
            <CartIcon />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>

          {}
          <button type="button" className="icon-btn nav-toggle" onClick={() => setOpen(!open)} title="Menu">
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
