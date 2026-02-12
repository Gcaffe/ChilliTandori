import AllergenIcons from './AllergenIcons';
import { useCart } from '../context/CartContext';

const DishCard = ({ plato, alergenos, idioma, showCheckbox = false, isClickable = false, onDishClick = null }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const nombre = idioma === 'es' ? plato.nombreES : plato.nombreEN;
  const descripcion = idioma === 'es' ? plato.descripcionES : plato.descripcionEN;
  
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      // Checkbox activado → añadir al carrito
      addToCart(plato);
    } else {
      // Checkbox desactivado → quitar del carrito
      removeFromCart(plato.numPlato);
    }
  };

  const handleCardClick = (e) => {
    // No ejecutar si se hace click en el checkbox
    if (e.target.closest('input[type="checkbox"]')) {
      return;
    }
    
    // En modo gallery, siempre es clickeable
    if (isClickable && onDishClick) {
      onDishClick(plato);
      return;
    }
    
    // En otros modos, solo si tiene foto
    if (plato.tieneFoto === 1 && onDishClick) {
      onDishClick(plato);
    }
  };
  
  return (
    <div 
      style={{
        ...styles.card,
        ...(isClickable || plato.tieneFoto === 1 ? styles.cardClickable : {})
      }}
      onClick={handleCardClick}
    >
      {/* Información del plato */}
      <div style={styles.content}>
        {/* Primera línea: checkbox + número + nombre + 📷 | alérgenos | precio */}
        <div style={styles.mainRow}>
          <div style={styles.leftSection}>
            {showCheckbox && (
              <input 
                type="checkbox"
                style={styles.checkbox}
                checked={isInCart(plato.numPlato)}
                onChange={handleCheckboxChange}
              />
            )}
            <div style={styles.nameSection}>
              {plato.numPlato && plato.tipoFila !== 'TITULO' && (
                <span style={styles.number}>{plato.numPlato}.</span>
              )}
              <span style={plato.tipoFila === 'TITULO' ? styles.nameTitle : styles.name}>
                {nombre}
              </span>
              {/* Icono 📷 si tiene foto */}
              {plato.tieneFoto === 1 && (
                <span style={styles.cameraIcon}>📷</span>
              )}
            </div>
          </div>

          {/* Iconos de alérgenos en el medio */}
          {plato.alergenos && plato.alergenos.trim() !== '' && (
            <div style={styles.allergensCenter}>
              <AllergenIcons 
                alergenosStr={plato.alergenos}
                alergenos={alergenos}
                idioma={idioma}
              />
            </div>
          )}

          {/* Precio a la derecha */}
          {plato.precio && (
            <span style={styles.price}>{plato.precio.toFixed(2)}€</span>
          )}
        </div>

        {/* Segunda línea: descripción en rojo y negrita */}
        {descripcion && (
          <p style={styles.description}>{descripcion}</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    gap: '12px',          // Reducido de 15px
    padding: '10px',      // Reducido de 15px
    backgroundColor: '#fff',
    borderRadius: '6px',  // Reducido de 8px
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',  // Reducido
    transition: 'box-shadow 0.3s, transform 0.3s',
    cursor: 'default'
  },
  cardClickable: {
    cursor: 'pointer',
    ':hover': {
      boxShadow: '0 4px 12px rgba(139, 44, 31, 0.2)',
      transform: 'translateY(-2px)'
    }
  },
  content: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'            // Reducido de 10px
  },
  mainRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',          // Reducido de 15px
    flexWrap: 'wrap'
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',           // Reducido de 10px
    flex: '1 1 auto',
    minWidth: '200px'
  },
  checkbox: {
    width: '18px',        // Reducido de 20px
    height: '18px',       // Reducido de 20px
    cursor: 'pointer',
    flexShrink: 0
  },
  nameSection: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',           // Reducido de 8px
    flexWrap: 'wrap'
  },
  number: {
    fontSize: '13px',     // Reducido de 14px
    fontWeight: '600',
    color: '#8B2C1F',
    flexShrink: 0
  },
  name: {
    fontSize: '16px',     // Reducido de 18px
    fontWeight: '600',
    color: '#2C1810'
  },
  nameTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#2563eb',
    textTransform: 'uppercase'
  },
  cameraIcon: {
    fontSize: '16px',
    marginLeft: '8px',
    opacity: 0.7
  },
  allergensCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 1 auto',
    padding: '0 8px'      // Reducido de 10px
  },
  price: {
    fontSize: '18px',     // Reducido de 20px
    fontWeight: '700',
    color: '#8B2C1F',
    whiteSpace: 'nowrap',
    flexShrink: 0
  },
  description: {
    fontSize: '13px',     // Reducido de 14px
    color: '#8B2C1F',
    fontWeight: '700',
    lineHeight: '1.4',    // Reducido de 1.5
    margin: 0,
    paddingLeft: '20px'   // Reducido de 22px
  }
};

export default DishCard;
