import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/Hero/HeroSection';
import ProductCard from './components/Product/ProductCard';
import Cart from './components/Cart/Cart';
import InstagramSection from './components/Instagram/InstagramSection';
import { getProducts, getCategories, getOffers } from './api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroSlides, setHeroSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData, offersData] = await Promise.all([
          getProducts(),
          getCategories(),
          getOffers()
        ]);
        setProducts(productsData);
        setCategories(['All', ...categoriesData.map(c => c.name)]);
        setHeroSlides(offersData);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToCart = (product, selectedSize) => {
    setCartItems(prevItems => {
      const cartItemId = `${product.id}-${selectedSize}`;
      
      const existingItem = prevItems.find(item => item.cartItemId === cartItemId);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { 
        ...product, 
        quantity: 1, 
        selectedSize,
        cartItemId
      }];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
  };
  
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartItemId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <Header
        cartItemsCount={getTotalCartItems()}
        onCartClick={() => setIsCartOpen(true)}
      />
      <HeroSection slides={heroSlides} />
      <main className="main-content">
        <section className="products-section">
          <h2 className="section-title">Our Products</h2>
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(product, size) => addToCart(product, size)}
              />
            ))}
          </div>
        </section>
        <InstagramSection />
      </main>
      <Cart
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}

export default App;