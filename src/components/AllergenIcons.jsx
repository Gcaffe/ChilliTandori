// Función helper para parsear alérgenos desde string
const parseAlergenos = (alergenosStr) => {
  if (!alergenosStr || alergenosStr.trim() === '') return [];
  
  // Limpiar y separar por comas
  return alergenosStr
    .split(',')
    .map(a => a.trim())
    .filter(a => a !== '' && !isNaN(a)); // Solo números válidos
};

// Componente para mostrar un solo icono de alérgeno
const AllergenIcon = ({ numAlerg, alergenos, idioma }) => {
  // CAMBIADO: Buscar por "num" en lugar de "numAlerg"
  const alergeno = alergenos.find(a => a.num === parseInt(numAlerg));
  
  if (!alergeno) {
    console.warn(`Alérgeno ${numAlerg} no encontrado en la lista`);
    return null;
  }

  const nombre = idioma === 'es' ? alergeno.nombreES : alergeno.nombreEN;
  const imagePath = `/images/alergenos/${numAlerg}.png`;
  
  return (
    <img 
      src={imagePath}
      alt={nombre}
      title={nombre}
      style={styles.icon}
    />
  );
};

// Componente para mostrar lista de iconos de alérgenos
const AllergenIcons = ({ alergenosStr, alergenos, idioma }) => {
  // Validaciones
  if (!alergenosStr || alergenosStr.trim() === '') {
    return null;
  }
  
  if (!alergenos || alergenos.length === 0) {
    console.warn('Lista de alérgenos vacía');
    return null;
  }
  
  const alergenosList = parseAlergenos(alergenosStr);
  
  if (alergenosList.length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      {alergenosList.map((numAlerg) => (
        <AllergenIcon 
          key={numAlerg}
          numAlerg={numAlerg}
          alergenos={alergenos}
          idioma={idioma}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  icon: {
    width: '24px',
    height: '24px',
    objectFit: 'contain',
    flexShrink: 0
  }
};

export default AllergenIcons;
