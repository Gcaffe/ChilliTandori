import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import AllergenIcons from './AllergenIcons';

const DishModal = ({ isOpen, onClose, plato, alergenos }) => {
  const { addToCart } = useCart();
  const { currentLanguage } = useLanguage();

  if (!isOpen || !plato) return null;

  const nombre = currentLanguage === 'es' ? plato.nombreES : plato.nombreEN;
  const descripcion = currentLanguage === 'es' ? plato.descripcionES : plato.descripcionEN;

  const getText = (key) => {
    const texts = {
      addToCart: {
        es: 'Añadir al Carrito',
        en: 'Add to Cart'
      },
      close: {
        es: 'Cerrar',
        en: 'Close'
      },
      added: {
        es: '¡Añadido al carrito!',
        en: 'Added to cart!'
      }
    };
    return texts[key][currentLanguage];
  };

  const handleAddToCart = () => {
    addToCart(plato);
    // Mostrar feedback visual
    alert(getText('added'));
  };

  // Ruta de la imagen
  const imagePath = `/images/carta/${plato.numPlato}.jpg`;

  return (
    <>
      {/* Overlay */}
      <div style={styles.overlay} onClick={onClose} />
      
      {/* Modal */}
      <div style={styles.modal}>
        {/* Botón cerrar */}
        <button 
          style={styles.closeButton} 
          onClick={onClose}
          onMouseEnter={(e) => e.target.style.transform = 'rotate(90deg)'}
          onMouseLeave={(e) => e.target.style.transform = 'rotate(0deg)'}
        >
          ✕
        </button>

        {/* Contenido del modal */}
        <div style={styles.content}>
          {/* Foto del plato */}
          <div style={styles.imageContainer}>
            <img 
              src={imagePath}
              alt={nombre}
              style={styles.image}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;color:#999;">Sin foto disponible</div>';
              }}
            />
          </div>

          {/* Información del plato */}
          <div style={styles.info}>
            {/* Número y nombre */}
            <div style={styles.header}>
              {plato.numPlato && (
                <span style={styles.number}>{plato.numPlato}.</span>
              )}
              <h2 style={styles.name}>{nombre}</h2>
            </div>

            {/* Descripción */}
            {descripcion && (
              <p style={styles.description}>{descripcion}</p>
            )}

            {/* Alérgenos */}
            {plato.alergenos && plato.alergenos.trim() !== '' && (
              <div style={styles.allergensSection}>
                <span style={styles.allergensLabel}>
                  {currentLanguage === 'es' ? 'Alérgenos:' : 'Allergens:'}
                </span>
                <AllergenIcons 
                  alergenosStr={plato.alergenos}
                  alergenos={alergenos}
                  idioma={currentLanguage}
                />
              </div>
            )}

            {/* Precio */}
            {plato.precio && (
              <div style={styles.priceSection}>
                <span style={styles.price}>{plato.precio.toFixed(2)}€</span>
              </div>
            )}

            {/* Botón añadir al carrito */}
            <button 
              style={styles.addButton}
              onClick={handleAddToCart}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1C0F'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#8B2C1F'}
            >
              🛒 {getText('addToCart')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease'
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    zIndex: 1001,
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflow: 'hidden',
    animation: 'slideIn 0.3s ease'
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: '#8B2C1F',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '24px',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s',
    transform: 'rotate(0deg)',
    zIndex: 1002,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 768px)': {
      flexDirection: 'column'
    }
  },
  imageContainer: {
    flex: '0 0 400px',
    height: '400px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  info: {
    flex: 1,
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    overflowY: 'auto',
    maxHeight: '90vh'
  },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '10px'
  },
  number: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#8B2C1F',
    flexShrink: 0
  },
  name: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '700',
    color: '#2C1810',
    fontFamily: "'Cinzel', serif"
  },
  description: {
    fontSize: '16px',
    color: '#8B2C1F',
    fontWeight: '600',
    lineHeight: '1.6',
    margin: 0
  },
  allergensSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#F9F9F9',
    borderRadius: '8px',
    border: '1px solid #E8D6A8'
  },
  allergensLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2C1810',
    flexShrink: 0
  },
  priceSection: {
    padding: '15px',
    backgroundColor: '#F9F9F9',
    borderRadius: '8px',
    textAlign: 'center'
  },
  price: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#8B2C1F'
  },
  addButton: {
    backgroundColor: '#8B2C1F',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '16px',
    fontSize: '18px',
    fontWeight: '700',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  }
};

// Media query para móvil (necesitamos añadirlo al index.css)
const mobileStyles = `
@media (max-width: 768px) {
  .dish-modal-content {
    flex-direction: column !important;
  }
  .dish-modal-image {
    flex: 1 !important;
    height: 300px !important;
  }
  .dish-modal-info {
    max-height: calc(90vh - 300px) !important;
  }
}
`;

export default DishModal;
