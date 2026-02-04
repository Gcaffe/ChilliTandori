import AllergenIcons from './AllergenIcons';

const DailyMenu = ({ platos, alergenos, idioma }) => {
  const menus = [];
  let currentMenu = null;
  let currentSection = null;

  platos.forEach(item => {
    if (item.tipoFila === 'TITULO') {
      if (currentMenu) {
        menus.push(currentMenu);
      }
      currentMenu = {
        titulo: idioma === 'es' ? item.nombreES : item.nombreEN,
        precio: item.precio,
        secciones: []
      };
      currentSection = null;
    } else if (item.tipoFila === 'SECCION') {
      currentSection = {
        nombre: idioma === 'es' ? item.nombreES : item.nombreEN,
        platos: []
      };
      if (currentMenu) {
        currentMenu.secciones.push(currentSection);
      }
    } else if (item.tipoFila === 'PLATO') {
      if (currentSection) {
        currentSection.platos.push(item);
      }
    }
  });

  if (currentMenu) {
    menus.push(currentMenu);
  }

  return (
    <div style={styles.container}>
      {menus.map((menu, idx) => (
        <div key={idx} style={styles.menuCard}>
          <div style={styles.menuHeader}>
            <h2 style={styles.menuTitle} className="font-logo">{menu.titulo}</h2>
            {menu.precio && (
              <span style={styles.menuPrice}>{menu.precio.toFixed(2)}€</span>
            )}
          </div>

          {menu.secciones.map((seccion, secIdx) => (
            <div key={secIdx} style={styles.section}>
              <h3 style={styles.sectionTitle}>{seccion.nombre}</h3>
              
              <div style={styles.dishList}>
                {seccion.platos.map((plato, platoIdx) => {
                  const nombre = idioma === 'es' ? plato.nombreES : plato.nombreEN;
                  const descripcion = idioma === 'es' ? plato.descripcionES : plato.descripcionEN;
                  
                  return (
                    <div key={platoIdx} style={styles.dish}>
                      <div style={styles.dishHeader}>
                        <div style={styles.dishMainInfo}>
                          {plato.numPlato && (
                            <span style={styles.dishNumber}>{plato.numPlato}.</span>
                          )}
                          <span style={styles.dishName}>{nombre}</span>
                        </div>
                        
                        {plato.alergenos && plato.alergenos.trim() !== '' && (
                          <div style={styles.allergens}>
                            <AllergenIcons 
                              alergenosStr={plato.alergenos}
                              alergenos={alergenos}
                              idioma={idioma}
                            />
                          </div>
                        )}
                      </div>
                      
                      {descripcion && (
                        <p style={styles.dishDescription}>{descripcion}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px',              // Reducido de 30px
    marginTop: '15px'         // Reducido de 20px
  },
  menuCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: '8px',      // Reducido de 10px
    padding: '18px',          // Reducido de 25px
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',  // Reducido
    border: '2px solid #E8D6A8'
  },
  menuHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',     // Reducido de 20px
    paddingBottom: '12px',    // Reducido de 15px
    borderBottom: '2px solid #8B2C1F'
  },
  menuTitle: {
    fontSize: '22px',         // Reducido de 24px
    color: '#8B2C1F',
    margin: 0,
    letterSpacing: '1px'
  },
  menuPrice: {
    fontSize: '24px',         // Reducido de 28px
    fontWeight: '700',
    color: '#8B2C1F'
  },
  section: {
    marginBottom: '15px'      // Reducido de 20px
  },
  sectionTitle: {
    fontSize: '16px',         // Reducido de 18px
    fontWeight: '600',
    color: '#2C1810',
    marginBottom: '8px',      // Reducido de 12px
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  dishList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'                // Reducido de 10px
  },
  dish: {
    padding: '8px',           // Reducido de 10px
    backgroundColor: '#fff',
    borderRadius: '4px',      // Reducido de 6px
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'                // Reducido de 6px
  },
  dishHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',               // Reducido de 10px
    flexWrap: 'wrap'
  },
  dishMainInfo: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',               // Reducido de 8px
    flex: '1 1 auto'
  },
  dishNumber: {
    fontSize: '13px',         // Reducido de 14px
    fontWeight: '600',
    color: '#8B2C1F',
    flexShrink: 0
  },
  dishName: {
    fontSize: '15px',         // Reducido de 16px
    fontWeight: '500',
    color: '#2C1810'
  },
  allergens: {
    display: 'flex',
    alignItems: 'center',
    flex: '0 1 auto'
  },
  dishDescription: {
    fontSize: '12px',         // Reducido de 13px
    color: '#8B2C1F',
    fontWeight: '700',
    lineHeight: '1.3',        // Reducido de 1.4
    margin: 0,
    paddingLeft: '19px'       // Reducido de 22px
  }
};

export default DailyMenu;
