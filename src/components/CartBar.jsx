import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const CartBar = ({ onOpenModal }) => {
  const { cartItems, getTotalItems, getTotalPrice } = useCart();
  const { currentLanguage } = useLanguage();

  // No mostrar si el carrito está vacío
  if (cartItems.length === 0) return null;

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const getText = (key) => {
    const texts = {
      items: {
        es: totalItems === 1 ? 'plato' : 'platos',
        en: totalItems === 1 ? 'item' : 'items'
      },
      viewOrder: {
        es: 'Ver Pedido',
        en: 'View Order'
      }
    };
    return texts[key][currentLanguage];
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <span style={styles.items}>
          {totalItems} {getText('items')}
        </span>
        <span style={styles.divider}>|</span>
        <span style={styles.total}>
          {totalPrice.toFixed(2)}€
        </span>
        <span style={styles.divider}>|</span>
        <button 
          style={styles.button}
          onClick={onOpenModal}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          {getText('viewOrder')}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#8B2C1F',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
    zIndex: 998,
    padding: '12px 0'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap'
  },
  items: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600'
  },
  divider: {
    color: '#fff',
    fontSize: '16px',
    opacity: 0.7
  },
  total: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: '700'
  },
  button: {
    backgroundColor: '#fff',
    color: '#8B2C1F',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 25px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transform: 'scale(1)'
  }
};

export default CartBar;
