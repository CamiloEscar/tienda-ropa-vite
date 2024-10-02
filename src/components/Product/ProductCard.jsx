import PropTypes from 'prop-types';
import { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  
  const handleAddToCart = () => {
    if (product.stock > 0 && selectedSize) {
      console.log('Adding to cart:', {
        ...product,
        selectedSize
      });
      onAddToCart(product, selectedSize);
    }
  };
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.imageUrl || "/api/placeholder/300/200"} 
          alt={product.name}
          className="product-image"
        />
        {product.promo && (
          <span className="product-badge promo-badge">
            {product.promo}
          </span>
        )}
      </div>
      
      <div className="product-content">
        <div className="product-header">
          <div>
            <h3 className="product-title">{product.name}</h3>
            <p className="product-brand">{product.marca}</p>
          </div>
          <button className="favorite-button">
            <i className="heart-icon">♥</i>
          </button>
        </div>
        
        <p className="product-description">{product.description}</p>
        
        <div className="size-selector">
          <label className="size-label">Selecciona el talle:</label>
          <div className="size-options">
            {product.size.map((size) => (
              <label key={size} className="size-option">
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={(e) => setSelectedSize(e.target.value)}
                />
                <span className="size-button">{size}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          {product.stock < 5 && product.stock > 0 && (
            <span className="stock-badge">¡Últimas unidades!</span>
          )}
        </div>
      </div>
      
      <button 
        className={`add-to-cart-button ${(!selectedSize || product.stock === 0) ? 'disabled' : ''}`}
        onClick={handleAddToCart}
        disabled={product.stock === 0 || !selectedSize}
      >
        <i className="cart-icon">🛒</i>
        {product.stock > 0 
          ? selectedSize 
            ? 'Añadir al carrito' 
            : 'Selecciona un talle'
          : 'Agotado'
        }
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    name: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    promo: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    size: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;