import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Carousel = ({ images, autoPlayInterval = 5000 }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, images.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      style={styles.carouselContainer}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Imágenes */}
      <div style={styles.slidesContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              ...styles.slide,
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 1 : 0
            }}
          >
            <img 
              src={image} 
              alt={`Slide ${index + 1}`}
              style={styles.slideImage}
            />
            
            {/* CTAs sobre la imagen */}
            {index === currentIndex && (
              <div style={styles.ctaOverlay}>
                <div style={styles.ctaButtons}>
                  <button className="btn btn-primary" style={styles.ctaButton}>
                    🛵 {t('cta.takeaway')}
                  </button>
                  <button className="btn btn-secondary" style={styles.ctaButton}>
                    🍽️ {t('cta.dailymenus')}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button 
        onClick={goToPrevious}
        style={{...styles.navButton, ...styles.prevButton}}
        aria-label="Anterior"
      >
        ‹
      </button>
      <button 
        onClick={goToNext}
        style={{...styles.navButton, ...styles.nextButton}}
        aria-label="Siguiente"
      >
        ›
      </button>

      {/* Indicadores (dots) */}
      <div style={styles.indicators}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              ...styles.indicator,
              backgroundColor: index === currentIndex ? '#8B2C1F' : 'rgba(255,255,255,0.5)'
            }}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  carouselContainer: {
    position: 'relative',
    width: '100%',
    height: '500px',
    overflow: 'hidden',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  slidesContainer: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 0.5s ease-in-out'
  },
  slideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  ctaOverlay: {
    position: 'absolute',
    bottom: '60px',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  ctaButtons: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  ctaButton: {
    padding: '15px 30px',
    fontSize: '18px',
    fontWeight: '600',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#fff',
    border: 'none',
    fontSize: '40px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    zIndex: 2,
    borderRadius: '5px'
  },
  prevButton: {
    left: '20px'
  },
  nextButton: {
    right: '20px'
  },
  indicators: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
    zIndex: 2
  },
  indicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '2px solid #fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    padding: 0
  }
};

export default Carousel;
