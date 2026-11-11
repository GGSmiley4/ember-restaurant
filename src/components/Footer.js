import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div>
          <h3>🔥 Ember</h3>
          <p>Burgers, drinks and desserts made fresh and delivered to your door.</p>
        </div>

        <div>
          <h4>Pages</h4>
          <Link to="/menu">Menu</Link>
          <Link to="/track">Track Order</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h4>Visit us</h4>
          <p>📍 Downtown</p>
          <p>📞 08 919 353</p>
          <p>🕒 Daily 11:00 – 23:00</p>
        </div>
      </div>

      <p className="copyright">&copy; 2026 Ember. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
