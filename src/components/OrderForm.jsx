import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const OrderForm = ({ isOpen, onClose, onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const { cartItems, getTotalPrice } = useCart();
  const { currentLanguage } = useLanguage();

  if (!isOpen) return null;

  const getText = (key) => {
    const texts = {
      title: {
        es: 'Datos del Cliente',
        en: 'Customer Information'
      },
      name: {
        es: 'Nombre',
        en: 'Name'
      },
      phone: {
        es: 'Teléfono',
        en: 'Phone'
      },
      cancel: {
        es: 'Cancelar',
        en: 'Cancel'
      },
      send: {
        es: 'Enviar Pedido',
        en: 'Send Order'
      },
      nameRequired: {
        es: 'Por favor, introduce tu nombre',
        en: 'Please enter your name'
      },
      phoneRequired: {
        es: 'Por favor, introduce tu teléfono',
        en: 'Please enter your phone'
      },
      items: {
        es: cartItems.length === 1 ? 'plato' : 'platos',
        en: cartItems.length === 1 ? 'item' : 'items'
      }
    };
    return texts[key][currentLanguage];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nombre.trim()) {
      alert(getText('nameRequired'));
      return;
    }
    
    if (!telefono.trim()) {
      alert(getText('phoneRequired'));
      return;
    }
    
    onSubmit({ nombre, telefono });
  };

  return (
    <>
      {/* Overlay */}
      <div style={styles.overlay} onClick={onClose} />
      
      {/* Modal */}
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>{getText('title')}</h2>
          <button 
            style={styles.closeButton} 
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.transform = 'rotate(90deg)'}
            onMouseLeave={(e) => e.target.style.transform = 'rotate(0deg)'}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>{getText('name')}:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={styles.input}
              placeholder={getText('name')}
              autoFocus
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>{getText('phone')}:</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              style={styles.input}
              placeholder="612 345 678"
            />
          </div>

          {/* Resumen del pedido */}
          <div style={styles.summary}>
            <div style={styles.summaryRow}>
              <span>{cartItems.length} {getText('items')}</span>
              <span style={styles.summaryTotal}>{getTotalPrice().toFixed(2)}€</span>
            </div>
          </div>

          {/* Botones */}
          <div style={styles.buttons}>
            <button 
              type="button" 
              style={styles.cancelButton} 
              onClick={onClose}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
            >
              {getText('cancel')}
            </button>
            <button 
              type="submit" 
              style={styles.submitButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#6B1C0F'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#8B2C1F'}
            >
              {getText('send')}
            </button>
          </div>
        </form>
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
    zIndex: 1002,
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
    zIndex: 1003,
    width: '90%',
    maxWidth: '500px',
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
    fontSize: '22px',
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
  form: {
    padding: '20px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#2C1810'
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #E8D6A8',
    borderRadius: '8px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s'
  },
  summary: {
    backgroundColor: '#F9F9F9',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #E8D6A8'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: '600',
    color: '#2C1810'
  },
  summaryTotal: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#8B2C1F'
  },
  buttons: {
    display: 'flex',
    gap: '10px'
  },
  cancelButton: {
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
    transition: 'background-color 0.3s'
  },
  submitButton: {
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
    transition: 'background-color 0.3s'
  }
};

export default OrderForm;
