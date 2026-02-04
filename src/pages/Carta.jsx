import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMenuData, getPlatosByCategoria } from '../hooks/useMenuData';
import DishCard from '../components/DishCard';
import DailyMenu from '../components/DailyMenu';
import AllergenList from '../components/AllergenList';

const Carta = () => {
  const { t } = useTranslation();
  const { categorias, platos, alergenos, loading, error, currentLanguage } = useMenuData();
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [viewMode, setViewMode] = useState('normal');

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
    if (viewMode === 'daily') {
      return categorias.filter(cat => cat.num === 1100);
    } else {
      return categorias.filter(cat => cat.num !== 1100);
    }
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
        📖 Ver Carta
      </button>
      <button 
        style={{
          ...styles.modeButton,
          ...(viewMode === 'takeaway' ? styles.modeButtonActive : {})
        }}
        onClick={() => handleModeChange('takeaway')}
      >
        🛵 Para Llevar
      </button>
      <button 
        style={{
          ...styles.modeButton,
          ...(viewMode === 'daily' ? styles.modeButtonActive : {})
        }}
        onClick={() => handleModeChange('daily')}
      >
        🍽️ Menús Diarios
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
            onCheckboxChange={(plato, checked) => {
              console.log('Plato seleccionado:', plato, checked);
            }}
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

  return (
    <div style={styles.container}>
      <div className="container">
        <h1 style={styles.title} className="font-logo">{t('nav.carta')}</h1>
        {renderModeButtons()}
        {viewMode !== 'daily' && renderCategorias()}
        {viewMode === 'daily' ? renderDailyMenus() : renderPlatos()}
      </div>
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
