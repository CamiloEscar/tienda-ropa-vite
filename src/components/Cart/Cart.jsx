import PropTypes from 'prop-types';
import './Cart.css';

function Cart({ isOpen, items, onClose, onRemoveFromCart, onUpdateQuantity }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (cartItemId, newQuantity) => {
    onUpdateQuantity(cartItemId, newQuantity);
  };

  const formatWhatsAppMessage = () => {
    const itemsList = items.map(item => 
      `${item.name} - Talle: ${item.selectedSize} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    return encodeURIComponent(`Hola, mi pedido:\n${itemsList}\n\nTotal: $${total.toFixed(2)}`);
  };

  return (
    <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Tu pedido ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>
        <button className="button button-outline" onClick={onClose} aria-label="Close cart">✕</button>
      </div>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.cartItemId} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <div className="cart-item-specs">
                <span className="cart-item-size">Talle: {item.selectedSize}</span>
                <span className="cart-item-price">${item.price.toFixed(2)}</span>
              </div>
              <div className="quantity-control">
                <button 
                  onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>
            </div>
            <button 
              className="button button-danger"
              onClick={() => onRemoveFromCart(item.cartItemId)}
              aria-label={`Remove ${item.name} from cart`}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <a 
          href={`https://wa.me/3442475466?text=${formatWhatsAppMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-primary"
          disabled={items.length === 0}
        >
          Checkout via WhatsApp
        </a>
      </div>
    </aside>
  );
}

Cart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      cartItemId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      selectedSize: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
};

export default Cart;