import { useTranslation } from 'react-i18next';
import Carousel from '../components/Carousel';
import FeaturedDishes from '../components/FeaturedDishes';

const Inicio = () => {
  const { t } = useTranslation();

  // Imágenes del carrusel - añade las tuyas aquí
  // Deben estar en: /public/images/general/INI_*.jpg
  const carouselImages = [
    '/images/general/INI_1.jpg',
    '/images/general/INI_2.jpg',
    '/images/general/INI_3.jpg',
    '/images/general/INI_4.jpg',
    '/images/general/INI_5.jpg',
  ];

  return (
    <div style={styles.container}>
      <div className="container">
        <h1 style={styles.title} className="font-logo">{t('hero.welcome')}</h1>
        <p style={styles.subtitle}>Auténtica cocina india en El Campello</p>
        
        {/* Carrusel de imágenes */}
        <Carousel images={carouselImages} autoPlayInterval={5000} />

        {/* Sección de info (minimizada) */}
        <div style={styles.infoSection}>
          <p style={styles.sectionText}>
            En <span className="font-logo" style={styles.brandName}>CHILLI TANDORI</span> te 
            ofrecemos los auténticos sabores de la India.
          </p>
        </div>
      </div>

      {/* Galería de platos destacados */}
      <FeaturedDishes />
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 0'
  },
  title: {
    fontSize: '48px',
    textAlign: 'center',
    marginBottom: '10px',
    color: '#8B2C1F',
    letterSpacing: '3px'
  },
  subtitle: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#666'
  },
  infoSection: {
    marginTop: '30px',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#F9F9F9',
    borderRadius: '8px'
  },
  sectionText: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#666',
    margin: 0
  },
  brandName: {
    color: '#8B2C1F',
    fontSize: '20px'
  }
};

export default Inicio;
