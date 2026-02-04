const AllergenList = ({ alergenos, idioma }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Lista de Alérgenos</h2>
      <div style={styles.list}>
        {alergenos.map(alergeno => {
          const nombre = idioma === 'es' ? alergeno.nombreES : alergeno.nombreEN;
          return (
            <div key={alergeno.num} style={styles.item}>
              <img 
                src={`/images/alergenos/${alergeno.num}.png`}
                alt={nombre}
                style={styles.icon}
              />
              <span style={styles.name}>{nombre}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px 0'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#8B2C1F',
    marginBottom: '20px',
    textAlign: 'center'
  },
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '12px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'default'
  },
  icon: {
    width: '32px',
    height: '32px',
    objectFit: 'contain',
    flexShrink: 0
  },
  name: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#2C1810'
  }
};

export default AllergenList;
