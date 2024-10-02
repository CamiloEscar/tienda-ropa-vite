import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './HeroSection.css';

const HeroSection = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [goToNextSlide]);

  return (
    <div className="hero-section">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img src={slide.image} alt={slide.title} className="hero-image" />
          <div className="hero-content">
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        </div>
      ))}
      <button
        onClick={goToPrevSlide}
        className="nav-btn prev-btn"
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      <button
        onClick={goToNextSlide}
        className="nav-btn next-btn"
        aria-label="Next slide"
      >
        &#10095;
      </button>
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HeroSection;