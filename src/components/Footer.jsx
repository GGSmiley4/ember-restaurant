import { Link } from 'react-router-dom';
import Logo from './Logo';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <Logo size={34} />
            <span className="brand-name">Ember</span>
          </Link>
          <p>Burgers, drinks and desserts made to order and delivered hot to your door.</p>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/track">Track an order</Link></li>
          </ul>
        </div>

        <div>
          <h4>Order by category</h4>
          <ul>
            <li><Link to="/menu?category=Burgers">Burgers</Link></li>
            <li><Link to="/menu?category=Drinks">Drinks</Link></li>
            <li><Link to="/menu?category=Desserts">Desserts</Link></li>
          </ul>
        </div>

        <div>
          <h4>Visit us</h4>
          <ul className="footer-contact">
            <li><MapPinIcon size={16} /> Downtown</li>
            <li><PhoneIcon size={16} /> 08 919 353</li>
            <li><MailIcon size={16} /> ember@gmail.com</li>
            <li><ClockIcon size={16} /> Daily 11:00 – 23:00</li>
          </ul>
        </div>
      </div>
      
        
    
    </footer>
  );
}
