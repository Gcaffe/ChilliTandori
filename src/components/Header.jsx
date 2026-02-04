import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { SpainFlag, UKFlag } from './Flags';

const Header = () => {
  const { t } = useTranslation();
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <header style={styles.header}>
      {/* Fila 1: Contacto y Redes Sociales */}
      <div style={styles.topBar}>
        <div className="container" style={styles.topBarContent}>
          <div style={styles.contactInfo}>
            <span style={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={styles.icon}>
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              632 469 875
            </span>
            <span style={{...styles.contactItem, marginLeft: '25px'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={styles.icon}>
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              info@chillitandori.com
            </span>
          </div>
          <div style={styles.socialMedia}>
            {/* Aquí irán los iconos de redes sociales */}
            <span style={styles.socialIcon}>FB</span>
            <span style={{...styles.socialIcon, marginLeft: '15px'}}>IG</span>
          </div>
        </div>
      </div>

      {/* Fila 2: Logo y Menú */}
      <div style={styles.mainBar}>
        <div className="container" style={styles.mainBarContent}>
          <div style={styles.logoContainer}>
            <Link to="/" style={styles.logoLink}>
              <img 
                src="/images/general/Logo.png" 
                alt="Chilli Tandori" 
                style={styles.logoImage}
              />
            </Link>
          </div>
          
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink} className="font-logo">{t('nav.inicio')}</Link>
            <Link to="/nosotros" style={styles.navLink} className="font-logo">{t('nav.nosotros')}</Link>
            <Link to="/carta" style={styles.navLink} className="font-logo">{t('nav.carta')}</Link>
            <Link to="/contactar" style={styles.navLink} className="font-logo">{t('nav.contactar')}</Link>
          </nav>

          <button onClick={toggleLanguage} style={styles.langButton} title="Cambiar idioma">
            <span style={styles.flagContainer}>
              {currentLanguage === 'es' ? (
                <>
                  <UKFlag width={28} height={20} />
                  <span style={styles.langText}>EN</span>
                </>
              ) : (
                <>
                  <SpainFlag width={28} height={20} />
                  <span style={styles.langText}>ES</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  },
  topBar: {
    backgroundColor: '#8B2C1F', // Color rojo del logo
    color: '#fff',
    padding: '12px 0',
    fontSize: '14px'
  },
  topBarContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contactInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500'
  },
  icon: {
    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))', // Sombra para mejor contraste
  },
  socialMedia: {
    display: 'flex',
    alignItems: 'center'
  },
  socialIcon: {
    padding: '5px 10px',
    borderRadius: '3px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  mainBar: {
    padding: '10px 0',
    backgroundColor: '#E8D6A8', // Color beige del logo
    borderBottom: '3px solid #8B2C1F'
  },
  mainBarContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px'
  },
  logoContainer: {
    flex: '0 0 auto'
  },
  logoLink: {
    display: 'block'
  },
  logoImage: {
    height: '60px',
    width: 'auto',
    display: 'block'
  },
  nav: {
    display: 'flex',
    gap: '35px',
    flex: '1',
    justifyContent: 'center'
  },
  navLink: {
    textDecoration: 'none',
    color: '#8B2C1F', // Color del texto del logo
    fontSize: '16px',
    fontWeight: '600',
    transition: 'color 0.3s',
    position: 'relative',
    padding: '5px 0'
  },
  langButton: {
    padding: '8px 12px',
    border: '2px solid #8B2C1F',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  flagContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  langText: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#8B2C1F',
    fontFamily: 'Cinzel, serif'
  }
};

export default Header;
