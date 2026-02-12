import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMenuData, getPlatosByCategoria } from '../hooks/useMenuData';
import { useCart } from '../context/CartContext';
import DishCard from '../components/DishCard';
import DailyMenu from '../components/DailyMenu';
import AllergenList from '../components/AllergenList';
import CartBar from '../components/CartBar';
import CartModal from '../components/CartModal';
import OrderForm from '../components/OrderForm';
import DishModal from '../components/DishModal';
import GalleryGrid from '../components/GalleryGrid';

const Carta = () => {
  const { t } = useTranslation();
  const { categorias, platos, alergenos, loading, error, currentLanguage } = useMenuData();
  const { cartItems, clearCart } = useCart();
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [viewMode, setViewMode] = useState('normal');
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  // Funciones para manejar modales
  const handleOpenCartModal = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false);
  };

  const handleCheckout = () => {
    setIsCartModalOpen(false);
    setIsOrderFormOpen(true);
  };

  const handleCloseOrderForm = () => {
    setIsOrderFormOpen(false);
  };

  // Función para enviar pedido por WhatsApp
  const handleSubmitOrder = ({ nombre, telefono }) => {
    // Generar mensaje para WhatsApp
    let mensaje = `Hola, soy ${nombre} (Tel: ${telefono})\n\n`;
    mensaje += `Mi pedido:\n`;
    
    cartItems.forEach(item => {
      const nombrePlato = currentLanguage === 'es' ? item.nombreES : item.nombreEN;
      const subtotal = (item.precio * item.quantity).toFixed(2);
      mensaje += `- ${item.quantity}x ${nombrePlato} - ${subtotal}€\n`;
    });
    
    const total = cartItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
    mensaje += `\nTOTAL: ${total.toFixed(2)}€`;
    
    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Número de WhatsApp del restaurante
    const numeroWhatsApp = '34632469875'; // 632 469 875
    
    // Generar URL de WhatsApp
    const whatsappURL = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Cerrar formulario y limpiar carrito
    setIsOrderFormOpen(false);
    clearCart();
  };

  // Funciones para manejar DishModal
  const handleOpenDishModal = (plato) => {
    setSelectedDish(plato);
    setIsDishModalOpen(true);
  };

  const handleCloseDishModal = () => {
    setIsDishModalOpen(false);
    setSelectedDish(null);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div className="container">
          <h1 style={styles.title} className="font-logo">{t('nav.carta')}</h1>
          <p style={styles.loading}>Cargando carta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div className="container">
          <h1 style={styles.title} className="font-logo">{t('nav.carta')}</h1>
          <p style={styles.error}>Error: {error}</p>
        </div>
      </div>
    );
  }

  const getVisibleCategorias = () => {
    let filtered;
    if (viewMode === 'daily') {
      filtered = categorias.filter(cat => cat.num === 1100);
    } else if (viewMode === 'gallery') {
      // Modo galería: solo categorías con fotos (tieneFoto = 1)
      filtered = categorias.filter(cat => cat.num !== 1100 && cat.tieneFoto === 1);
    } else {
      // Filtrar categorías normales (no menús diarios)
      filtered = categorias.filter(cat => cat.num !== 1100);
    }
    
    // Filtrar categorías con peso = 0 (ocultas)
    filtered = filtered.filter(cat => cat.peso !== 0);
    
    // Ordenar por peso (menor peso = primero)
    // Categorías sin peso (undefined) se tratan como 999
    return filtered.sort((a, b) => {
      const pesoA = a.peso || 999;
      const pesoB = b.peso || 999;
      return pesoA - pesoB;
    });
  };

  const visibleCategorias = getVisibleCategorias();
  const platosCategoria = selectedCategoria 
    ? getPlatosByCategoria(platos, selectedCategoria)
    : [];

  const handleModeChange = (mode) => {
    setViewMode(mode);
    setSelectedCategoria(null);
  };

  const renderModeButtons = () => (
    <div style={styles.modeButtons}>
      <button 
        style={{
          ...styles.modeButton,
          ...(viewMode === 'normal' ? styles.modeButtonActive : {})
        }}
        onClick={() => handleModeChange('normal')}
      >
        📖 {t('cta.viewmenu')}
      </button>
      <button 
        style={{
          ...styles.modeButton,
          ...(viewMode === 'takeaway' ? styles.modeButtonActive : {})
        }}
        onClick={() => handleModeChange('takeaway')}
      >
        🛵 {t('cta.takeaway')}
      </button>
      <button 
        style={{
          ...styles.modeButton,
          ...(viewMode === 'daily' ? styles.modeButtonActive : {})
        }}
        onClick={() => handleModeChange('daily')}
      >
        🍽️ {t('cta.dailymenus')}
      </button>
      <button 
        style={{
          ...styles.modeButton,
          ...(viewMode === 'gallery' ? styles.modeButtonActive : {})
        }}
        onClick={() => handleModeChange('gallery')}
      >
        📸 Ver Platos
      </button>
    </div>
  );

  const renderCategorias = () => (
    <div style={styles.categorias}>
      {visibleCategorias.map(categoria => (
        <button
          key={categoria.num}
          style={{
            ...styles.categoriaButton,
            ...(selectedCategoria === categoria.num ? styles.categoriaButtonActive : {})
          }}
          onClick={() => setSelectedCategoria(categoria.num)}
        >
          {categoria.nombre}
        </button>
      ))}
    </div>
  );

  const renderPlatos = () => {
    if (!selectedCategoria) {
      return (
        <div style={styles.emptyState}>
          <p>Selecciona una categoría para ver los platos</p>
        </div>
      );
    }

    // Mostrar lista de alérgenos para categoría 1105
    if (selectedCategoria === 1105) {
      return <AllergenList alergenos={alergenos} idioma={currentLanguage} />;
    }

    if (platosCategoria.length === 0) {
      return (
        <div style={styles.emptyState}>
          <p>No hay platos disponibles en esta categoría</p>
        </div>
      );
    }

    return (
      <div style={styles.platosList}>
        {platosCategoria.map((plato, index) => (
          <DishCard 
            key={index}
            plato={plato}
            alergenos={alergenos}
            idioma={currentLanguage}
            showCheckbox={viewMode === 'takeaway'}
            isClickable={viewMode === 'gallery'}
            onDishClick={handleOpenDishModal}
          />
        ))}
      </div>
    );
  };

  const renderDailyMenus = () => {
    const menusDiarios = getPlatosByCategoria(platos, 1100);
    
    if (menusDiarios.length === 0) {
      return (
        <div style={styles.emptyState}>
          <p>No hay menús diarios disponibles</p>
        </div>
      );
    }

    return (
      <DailyMenu 
        platos={menusDiarios}
        alergenos={alergenos}
        idioma={currentLanguage}
      />
    );
  };

  const renderGallery = () => {
    if (!selectedCategoria) {
      return (
        <div style={styles.emptyState}>
          <p>Selecciona una categoría para ver los platos</p>
        </div>
      );
    }

    // Filtrar solo platos con foto de la categoría seleccionada
    const platosConFoto = platosCategoria.filter(plato => plato.tieneFoto === 1);

    if (platosConFoto.length === 0) {
      return (
        <div style={styles.emptyState}>
          <p>No hay platos con fotos en esta categoría</p>
        </div>
      );
    }

    return (
      <GalleryGrid 
        platos={platosConFoto}
        onDishClick={handleOpenDishModal}
      />
    );
  };

  return (
    <div style={styles.container}>
      <div className="container">
        <h1 style={styles.title} className="font-logo">{t('nav.carta')}</h1>
        {renderModeButtons()}
        {viewMode !== 'daily' && viewMode !== 'gallery' && renderCategorias()}
        {viewMode === 'gallery' && renderCategorias()}
        {viewMode === 'daily' ? renderDailyMenus() : (viewMode === 'gallery' ? renderGallery() : renderPlatos())}
      </div>

      {/* Mostrar barra de carrito solo en modo takeaway */}
      {viewMode === 'takeaway' && (
        <CartBar onOpenModal={handleOpenCartModal} />
      )}

      {/* Modal del carrito */}
      <CartModal 
        isOpen={isCartModalOpen}
        onClose={handleCloseCartModal}
        onCheckout={handleCheckout}
      />

      {/* Formulario de pedido */}
      <OrderForm 
        isOpen={isOrderFormOpen}
        onClose={handleCloseOrderForm}
        onSubmit={handleSubmitOrder}
      />

      {/* Modal de detalle del plato */}
      <DishModal 
        isOpen={isDishModalOpen}
        onClose={handleCloseDishModal}
        plato={selectedDish}
        alergenos={alergenos}
      />
    </div>
  );
};

const styles = {
  container: {
    padding: '30px 0',      // Reducido de 40px
    minHeight: '60vh'
  },
  title: {
    fontSize: '42px',       // Reducido de 48px
    textAlign: 'center',
    marginBottom: '20px',   // Reducido de 30px
    color: '#8B2C1F',
    letterSpacing: '3px'
  },
  loading: {
    textAlign: 'center',
    fontSize: '16px',       // Reducido de 18px
    color: '#666',
    padding: '30px'         // Reducido de 40px
  },
  error: {
    textAlign: 'center',
    fontSize: '16px',       // Reducido de 18px
    color: '#c41e3a',
    padding: '30px'         // Reducido de 40px
  },
  modeButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',            // Reducido de 15px
    marginBottom: '20px',   // Reducido de 30px
    flexWrap: 'wrap'
  },
  modeButton: {
    padding: '10px 20px',   // Reducido de 12px 25px
    fontSize: '15px',       // Reducido de 16px
    fontWeight: '600',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#8B2C1F',
    backgroundColor: '#fff',
    color: '#8B2C1F',
    borderRadius: '6px',    // Reducido de 8px
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  modeButtonActive: {
    backgroundColor: '#8B2C1F',
    borderColor: '#8B2C1F',
    color: '#fff'
  },
  categorias: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',             // Reducido de 10px
    marginBottom: '20px',   // Reducido de 30px
    justifyContent: 'center'
  },
  categoriaButton: {
    padding: '8px 16px',    // Reducido de 10px 20px
    fontSize: '13px',       // Reducido de 14px
    fontWeight: '600',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#E8D6A8',
    backgroundColor: '#fff',
    color: '#2C1810',
    borderRadius: '5px',    // Reducido de 6px
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  categoriaButtonActive: {
    backgroundColor: '#E8D6A8',
    borderColor: '#8B2C1F',
    color: '#8B2C1F'
  },
  platosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'              // Reducido de 15px - ESTA ES LA CLAVE
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',   // Reducido de 60px
    fontSize: '16px',       // Reducido de 18px
    color: '#999'
  }
};

export default Carta;
