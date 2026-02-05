import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { SpainFlag, UKFlag } from './Flags';

const Header = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={styles.header}>
      {/* Fila 1: Contacto + Hamburguesa (móvil) o Contacto completo (desktop) */}
      <div style={styles.contactRow}>
        <div className="container" style={styles.contactContainer}>
          {/* Información de contacto */}
          <div style={styles.contactInfo}>
            <span style={styles.contactItem}>
              <span style={styles.icon}>📞</span>
              <span style={styles.contactText}>632 469 875</span>
            </span>
            {/* Email y redes solo en desktop */}
            <span style={{...styles.contactItem, ...styles.desktopOnly}}>
              <span style={styles.icon}>✉️</span>
              <span style={styles.contactText}>info@chillitandori.com</span>
            </span>
          </div>

          {/* Botón hamburguesa (solo móvil) */}
          <button 
            style={styles.hamburgerButton}
            onClick={toggleMenu}
            className="mobile-only"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Fila 2: Logo + Navegación (desktop) o Logo + Banderas (móvil) */}
      <div style={styles.navRow}>
        <div className="container" style={styles.navContainer}>
          {/* Logo */}
          <Link to="/" style={styles.logoLink}>
            <img 
              src="/images/general/Logo.png" 
              alt="Chilli Tandori" 
              style={styles.logo}
            />
          </Link>

          {/* Navegación desktop */}
          <nav style={styles.desktopNav} className="desktop-only">
            <Link 
              to="/" 
              style={{
                ...styles.navLink,
                ...(isActive('/') ? styles.navLinkActive : {})
              }}
            >
              {t('nav.inicio')}
            </Link>
            <Link 
              to="/nosotros"
              style={{
                ...styles.navLink,
                ...(isActive('/nosotros') ? styles.navLinkActive : {})
              }}
            >
              {t('nav.nosotros')}
            </Link>
            <Link 
              to="/carta"
              style={{
                ...styles.navLink,
                ...(isActive('/carta') ? styles.navLinkActive : {})
              }}
            >
              {t('nav.carta')}
            </Link>
            <Link 
              to="/contactar"
              style={{
                ...styles.navLink,
                ...(isActive('/contactar') ? styles.navLinkActive : {})
              }}
            >
              {t('nav.contactar')}
            </Link>
          </nav>

          {/* Selector de idioma */}
          <div style={styles.languageSelector}>
            <button
              onClick={() => changeLanguage('es')}
              style={{
                ...styles.flagButton,
                ...(currentLanguage === 'es' ? styles.flagButtonActive : {})
              }}
              title="Español"
            >
              <SpainFlag width={24} height={16} />
            </button>
            <button
              onClick={() => changeLanguage('en')}
              style={{
                ...styles.flagButton,
                ...(currentLanguage === 'en' ? styles.flagButtonActive : {})
              }}
              title="English"
            >
              <UKFlag width={24} height={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay del menú móvil */}
      {menuOpen && (
        <>
          {/* Fondo oscuro */}
          <div 
            style={styles.overlay}
            onClick={closeMenu}
          />
          
          {/* Menú lateral */}
          <div style={styles.sideMenu}>
            {/* Header del menú */}
            <div style={styles.menuHeader}>
              <span style={styles.menuTitle}>☰ MENÚ</span>
              <button 
                style={styles.closeButton}
                onClick={closeMenu}
              >
                ✕
              </button>
            </div>

            {/* Grid 2x2 de navegación */}
            <div style={styles.menuGrid}>
              <Link 
                to="/" 
                style={styles.menuItem}
                onClick={closeMenu}
              >
                <span style={styles.menuIcon}>🏠</span>
                <span style={styles.menuText}>{t('nav.inicio')}</span>
              </Link>
              <Link 
                to="/nosotros"
                style={styles.menuItem}
                onClick={closeMenu}
              >
                <span style={styles.menuIcon}>👥</span>
                <span style={styles.menuText}>{t('nav.nosotros')}</span>
              </Link>
              <Link 
                to="/carta"
                style={styles.menuItem}
                onClick={closeMenu}
              >
                <span style={styles.menuIcon}>📖</span>
                <span style={styles.menuText}>{t('nav.carta')}</span>
              </Link>
              <Link 
                to="/contactar"
                style={styles.menuItem}
                onClick={closeMenu}
              >
                <span style={styles.menuIcon}>📞</span>
                <span style={styles.menuText}>{t('nav.contactar')}</span>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Estilos CSS en línea para media queries */}
      <style>{`
        /* Desktop: mostrar navegación normal */
        @media (min-width: 1024px) {
          .mobile-only {
            display: none !important;
          }
        }

        /* Móvil: ocultar navegación desktop y mostrar hamburguesa */
        @media (max-width: 1023px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
        }

        /* Animaciones */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInRight {
          from { 
            transform: translateX(100%);
          }
          to { 
            transform: translateX(0);
          }
        }

        /* Hover effects */
        .mobile-only:hover {
          transform: scale(1.1);
        }

        button[style*="closeButton"]:hover {
          transform: rotate(90deg);
        }
      `}</style>
    </header>
  );
};

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  
  // Fila 1: Contacto
  contactRow: {
    backgroundColor: '#8B2C1F',
    padding: '8px 0'
  },
  contactContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contactInfo: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#fff',
    fontSize: '14px'
  },
  contactText: {
    textDecoration: 'none',
    color: '#fff'
  },
  icon: {
    fontSize: '16px',
    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
  },
  socialIcons: {
    display: 'flex',
    gap: '10px'
  },
  socialLink: {
    fontSize: '18px',
    textDecoration: 'none',
    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
    transition: 'transform 0.2s'
  },
  desktopOnly: {
    display: 'flex'
  },

  // Botón hamburguesa
  hamburgerButton: {
    display: 'none', // Controlado por CSS
    fontSize: '28px',
    color: '#fff',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '5px 10px',
    transition: 'transform 0.2s'
  },

  // Fila 2: Navegación
  navRow: {
    backgroundColor: '#E8D6A8',
    padding: '12px 0'
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px'
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    height: '50px',
    objectFit: 'contain'
  },
  
  // Navegación desktop
  desktopNav: {
    display: 'flex', // Controlado por CSS
    gap: '30px',
    flex: 1,
    justifyContent: 'center'
  },
  navLink: {
    textDecoration: 'none',
    color: '#2C1810',
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: "'Cinzel', serif",
    letterSpacing: '1px',
    transition: 'color 0.3s',
    textTransform: 'uppercase'
  },
  navLinkActive: {
    color: '#8B2C1F',
    borderBottom: '2px solid #8B2C1F'
  },

  // Selector de idioma
  languageSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  flagButton: {
    backgroundColor: 'transparent',
    border: '2px solid transparent',
    borderRadius: '4px',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s',
    opacity: 0.7
  },
  flagButtonActive: {
    border: '2px solid #8B2C1F',
    opacity: 1,
    transform: 'scale(1.1)'
  },

  // Overlay
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1998,
    animation: 'fadeIn 0.3s ease'
  },

  // Menú lateral
  sideMenu: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '85%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    zIndex: 1999,
    boxShadow: '-2px 0 8px rgba(0,0,0,0.2)',
    animation: 'slideInRight 0.3s ease',
    display: 'flex',
    flexDirection: 'column'
  },

  // Header del menú
  menuHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '2px solid #E8D6A8',
    backgroundColor: '#8B2C1F'
  },
  menuTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#fff',
    fontFamily: "'Cinzel', serif",
    letterSpacing: '2px'
  },
  closeButton: {
    fontSize: '32px',
    color: '#fff',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s'
  },

  // Grid 2x2 del menú
  menuGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    padding: '20px',
    flex: 1
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 20px',
    backgroundColor: '#F9F9F9',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.3s',
    border: '2px solid #E8D6A8',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  menuIcon: {
    fontSize: '32px',
    marginBottom: '8px'
  },
  menuText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2C1810',
    textTransform: 'uppercase',
    fontFamily: "'Cinzel', serif",
    letterSpacing: '1px',
    textAlign: 'center'
  }
};

export default Header;
