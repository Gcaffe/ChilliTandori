import { useLanguage } from '../context/LanguageContext';

const GalleryGrid = ({ platos, onDishClick }) => {
  const { currentLanguage } = useLanguage();

  if (!platos || platos.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p>{currentLanguage === 'es' ? 'No hay platos con fotos en esta categoría' : 'No dishes with photos in this category'}</p>
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {platos.map((plato, index) => {
        const nombre = currentLanguage === 'es' ? plato.nombreES : plato.nombreEN;
        const imagePath = `/images/carta/${plato.numPlato}.jpg`;

        return (
          <div 
            key={index}
            style={styles.gridItem}
            onClick={() => onDishClick(plato)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(139, 44, 31, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            {/* Contenedor de imagen */}
            <div style={styles.imageContainer}>
              <img 
                src={imagePath}
                alt={nombre}
                style={styles.image}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="250"%3E%3Crect fill="%23f5f5f5" width="250" height="250"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3ESin foto%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            {/* Nombre del plato */}
            <div style={styles.nameContainer}>
              <span style={styles.name}>{nombre}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px 0',
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(3, 1fr)'
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px'
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px'
    }
  },
  gridItem: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)'
  },
  imageContainer: {
    width: '100%',
    height: '250px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  },
  nameContainer: {
    padding: '15px',
    textAlign: 'center',
    minHeight: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2C1810',
    lineHeight: '1.4',
    fontFamily: "'Cinzel', serif"
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#999',
    fontSize: '16px'
  }
};

// CSS adicional para media queries (añadir a index.css si es necesario)
export const galleryGridStyles = `
@media (max-width: 1200px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 15px !important;
  }
  .gallery-grid-item {
    height: auto !important;
  }
  .gallery-image-container {
    height: 200px !important;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    gap: 10px !important;
  }
  .gallery-image-container {
    height: 180px !important;
  }
  .gallery-name {
    font-size: 14px !important;
    padding: 10px !important;
  }
}
`;

export default GalleryGrid;
