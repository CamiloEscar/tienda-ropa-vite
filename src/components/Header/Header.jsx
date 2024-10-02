import { useState } from 'react';
import PropTypes from 'prop-types';
import './header.css';

function Header({ cartItemsCount, onCartClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header-content">
        <h1 className="logo">Fashion Store</h1>
        
        <nav className="nav-desktop">
          <button className="button button-outline">Home</button>
          <button className="button button-outline">Shop</button>
          <button className="button button-outline">About</button>
          <button className="button button-outline">Contact</button>
        </nav>

        <div>
          <button className="button button-outline cart-button" onClick={onCartClick}>
            🛒
            {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
          </button>
          
          <button 
            className="button button-outline menu-button" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      
      <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
        <button className="button button-outline">Home</button>
        <button className="button button-outline">Shop</button>
        <button className="button button-outline">About</button>
        <button className="button button-outline">Contact</button>
      </nav>
    </header>
  );
}

Header.propTypes = {
  cartItemsCount: PropTypes.number.isRequired,
  onCartClick: PropTypes.func.isRequired,
};

export default Header;