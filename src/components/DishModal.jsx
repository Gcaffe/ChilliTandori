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
      <div className="dish-modal-overlay" onClick={onClose} />
      
      {/* Modal */}
      <div className="dish-modal">
        {/* Botón cerrar */}
        <button 
          className="dish-modal-close"
          onClick={onClose}
          onMouseEnter={(e) => e.target.style.transform = 'rotate(90deg)'}
          onMouseLeave={(e) => e.target.style.transform = 'rotate(0deg)'}
        >
          ✕
        </button>

        {/* Contenido del modal */}
        <div className="dish-modal-content">
          {/* Foto del plato */}
          <div className="dish-modal-image-container">
            <img 
              src={imagePath}
              alt={nombre}
              className="dish-modal-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;color:#999;">Sin foto disponible</div>';
              }}
            />
          </div>

          {/* Información del plato */}
          <div className="dish-modal-info">
            {/* Número y nombre */}
            <div className="dish-modal-header">
              {plato.numPlato && (
                <span className="dish-modal-number">{plato.numPlato}.</span>
              )}
              <h2 className="dish-modal-name">{nombre}</h2>
            </div>

            {/* Descripción */}
            {descripcion && (
              <p className="dish-modal-description">{descripcion}</p>
            )}

            {/* Alérgenos */}
            {plato.alergenos && plato.alergenos.trim() !== '' && (
              <div className="dish-modal-allergens">
                <span className="dish-modal-allergens-label">
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
              <div className="dish-modal-price-section">
                <span className="dish-modal-price">{plato.precio.toFixed(2)}€</span>
              </div>
            )}

            {/* Botón añadir al carrito */}
            <button 
              className="dish-modal-add-button"
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

export default DishModal;
