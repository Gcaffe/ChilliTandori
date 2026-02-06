import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const CartModal = ({ isOpen, onClose, onCheckout }) => {
  const { cartItems, incrementQuantity, decrementQuantity, removeFromCart, getTotalPrice } = useCart();
  const { currentLanguage } = useLanguage();

  if (!isOpen) return null;

  const getText = (key) => {
    const texts = {
      myOrder: {
        es: 'Mi Pedido',
        en: 'My Order'
      },
      continue: {
        es: 'Seguir',
        en: 'Continue'
      },
      placeOrder: {
        es: 'Hacer el Pedido',
        en: 'Place Order'
      },
      total: {
        es: 'TOTAL',
        en: 'TOTAL'
      },
      empty: {
        es: 'Tu pedido está vacío',
        en: 'Your order is empty'
      }
    };
    return texts[key][currentLanguage];
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      // Si cantidad es 1, quitar del carrito
      removeFromCart(item.numPlato);
      // Si era el último plato, cerrar modal
      if (cartItems.length === 1) {
        onClose();
      }
    } else {
      decrementQuantity(item.numPlato);
    }
  };

  return (
    <>
      {/* Overlay oscuro */}
      <div style={styles.overlay} onClick={onClose} />
      
      {/* Modal */}
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>{getText('myOrder')}</h2>
          <button 
            style={styles.closeButton} 
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.transform = 'rotate(90deg)'}
            onMouseLeave={(e) => e.target.style.transform = 'rotate(0deg)'}
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div style={styles.content}>
          {cartItems.length === 0 ? (
            <p style={styles.empty}>{getText('empty')}</p>
          ) : (
            <>
              {/* Lista de platos */}
              <div style={styles.itemsList}>
                {cartItems.map((item) => {
                  const nombre = currentLanguage === 'es' ? item.nombreES : item.nombreEN;
                  const subtotal = (item.precio * item.quantity).toFixed(2);
                  
                  return (
                    <div key={item.numPlato} style={styles.item}>
                      <div style={styles.itemInfo}>
                        <span style={styles.itemNumber}>{item.numPlato}.</span>
                        <span style={styles.itemName}>{nombre}</span>
                      </div>
                      
                      <div style={styles.itemControls}>
                        <button 
                          style={styles.quantityButton}
                          onClick={() => handleDecrement(item)}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1C0F'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#8B2C1F'}
                        >
                          −
                        </button>
                        
                        <span style={styles.quantity}>{item.quantity}</span>
                        
                        <button 
                          style={styles.quantityButton}
                          onClick={() => incrementQuantity(item.numPlato)}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1C0F'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#8B2C1F'}
                        >
                          +
                        </button>
                        
                        <span style={styles.itemPrice}>{subtotal}€</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div style={styles.totalSection}>
                <span style={styles.totalLabel}>{getText('total')}</span>
                <span style={styles.totalAmount}>{getTotalPrice().toFixed(2)}€</span>
              </div>
            </>
          )}
        </div>

        {/* Footer con botones */}
        {cartItems.length > 0 && (
          <div style={styles.footer}>
            <button 
              style={styles.continueButton} 
              onClick={onClose}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
            >
              {getText('continue')}
            </button>
            <button 
              style={styles.checkoutButton} 
              onClick={onCheckout}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1C0F'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#8B2C1F'}
            >
              {getText('placeOrder')}
            </button>
          </div>
        )}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    maxWidth: '600px',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideIn 0.3s ease'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '2px solid #E8D6A8',
    backgroundColor: '#8B2C1F'
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '700',
    color: '#fff',
    fontFamily: "'Cinzel', serif"
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '32px',
    color: '#fff',
    cursor: 'pointer',
    padding: 0,
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s',
    transform: 'rotate(0deg)'
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px'
  },
  empty: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#999',
    padding: '40px 20px'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '15px',
    backgroundColor: '#F9F9F9',
    borderRadius: '8px',
    border: '1px solid #E8D6A8'
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px'
  },
  itemNumber: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#8B2C1F',
    flexShrink: 0
  },
  itemName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2C1810',
    flex: 1
  },
  itemControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'flex-end'
  },
  quantityButton: {
    backgroundColor: '#8B2C1F',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    width: '36px',
    height: '36px',
    fontSize: '20px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s'
  },
  quantity: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#2C1810',
    minWidth: '30px',
    textAlign: 'center'
  },
  itemPrice: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#8B2C1F',
    minWidth: '70px',
    textAlign: 'right'
  },
  totalSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    padding: '20px 15px',
    backgroundColor: '#F9F9F9',
    borderRadius: '8px',
    border: '2px solid #8B2C1F'
  },
  totalLabel: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2C1810',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  totalAmount: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#8B2C1F'
  },
  footer: {
    display: 'flex',
    gap: '10px',
    padding: '20px',
    borderTop: '1px solid #E8D6A8'
  },
  continueButton: {
    flex: 1,
    padding: '14px',
    fontSize: '16px',
    fontWeight: '700',
    backgroundColor: '#fff',
    color: '#8B2C1F',
    border: '2px solid #8B2C1F',
    borderRadius: '8px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transition: 'background-color 0.3s'
  },
  checkoutButton: {
    flex: 1,
    padding: '14px',
    fontSize: '16px',
    fontWeight: '700',
    backgroundColor: '#8B2C1F',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transition: 'background-color 0.3s'
  }
};

export default CartModal;
