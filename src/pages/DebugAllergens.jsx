import { useMenuData } from '../hooks/useMenuData';
import AllergenIcons from '../components/AllergenIcons';

const DebugAllergens = () => {
  const { alergenos, platos, loading, error } = useMenuData();

  if (loading) return <div style={styles.container}><p>Cargando...</p></div>;
  if (error) return <div style={styles.container}><p>Error: {error}</p></div>;

  // Obtener platos con alérgenos
  const platosConAlergenos = platos.filter(p => p.alergenos && p.alergenos.trim() !== '');

  return (
    <div style={styles.container}>
      <h1>🔍 Diagnóstico de Alérgenos</h1>

      {/* Información general */}
      <div style={styles.section}>
        <h2>📊 Resumen</h2>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.label}>Alérgenos en JSON:</td>
              <td style={styles.value}>{alergenos.length}</td>
            </tr>
            <tr>
              <td style={styles.label}>Platos totales:</td>
              <td style={styles.value}>{platos.length}</td>
            </tr>
            <tr>
              <td style={styles.label}>Platos con alérgenos:</td>
              <td style={styles.value}>{platosConAlergenos.length}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Lista de alérgenos */}
      <div style={styles.section}>
        <h2>🥚 Lista de Alérgenos</h2>
        <p>Las imágenes deberían aparecer abajo. Si no aparecen, hay un problema en el componente.</p>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Num</th>
              <th style={styles.th}>Nombre ES</th>
              <th style={styles.th}>Nombre EN</th>
              <th style={styles.th}>Icono directo</th>
              <th style={styles.th}>Con componente</th>
            </tr>
          </thead>
          <tbody>
            {alergenos.map(alerg => (
              <tr key={alerg.num}>
                <td style={styles.td}>{alerg.num}</td>
                <td style={styles.td}>{alerg.nombreES}</td>
                <td style={styles.td}>{alerg.nombreEN}</td>
                <td style={styles.td}>
                  <img 
                    src={`/images/alergenos/${alerg.num}.png`}
                    alt={alerg.nombreES}
                    style={{ width: '24px', height: '24px' }}
                  />
                </td>
                <td style={styles.td}>
                  <AllergenIcons 
                    alergenosStr={String(alerg.num)}
                    alergenos={alergenos}
                    idioma="es"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Platos con alérgenos */}
      <div style={styles.section}>
        <h2>🍛 Platos con Alérgenos (primeros 20)</h2>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Num</th>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Alérgenos (string)</th>
              <th style={styles.th}>Iconos</th>
            </tr>
          </thead>
          <tbody>
            {platosConAlergenos.slice(0, 20).map((plato, idx) => (
              <tr key={idx}>
                <td style={styles.td}>{plato.numPlato}</td>
                <td style={styles.td}>{plato.nombreES}</td>
                <td style={styles.td}>
                  <code style={styles.code}>"{plato.alergenos}"</code>
                </td>
                <td style={styles.td}>
                  <AllergenIcons 
                    alergenosStr={plato.alergenos}
                    alergenos={alergenos}
                    idioma="es"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Test de imágenes directas */}
      <div style={styles.section}>
        <h2>📸 Test de Carga de Imágenes (5 primeros)</h2>
        <p>Estas son las imágenes cargadas directamente sin componente:</p>
        <div style={styles.imageGrid}>
          {[1, 2, 3, 4, 5].map(num => (
            <div key={num} style={styles.imageCard}>
              <img 
                src={`/images/alergenos/${num}.png`}
                alt={`Alérgeno ${num}`}
                style={{ width: '48px', height: '48px' }}
              />
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>
                Alérgeno {num}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Verificación */}
      <div style={styles.section}>
        <h2>✅ Verificación</h2>
        <div style={styles.checkList}>
          <p><strong>Si ves los iconos en "Icono directo":</strong> ✅ Las imágenes se sirven correctamente</p>
          <p><strong>Si ves los iconos en "Con componente":</strong> ✅ El componente AllergenIcons funciona</p>
          <p><strong>Si ves iconos en "Platos con Alérgenos":</strong> ✅ TODO funciona perfectamente</p>
          <hr />
          <p><strong>Si NO ves los iconos:</strong></p>
          <ul>
            <li>Prueba abrir directamente: <a href="/images/alergenos/1.png" target="_blank">/images/alergenos/1.png</a></li>
            <li>Recarga con Ctrl+Shift+R</li>
            <li>Revisa la consola (F12) para errores</li>
          </ul>
        </div>
      </div>

      {/* Datos JSON */}
      <div style={styles.section}>
        <h2>📄 Ejemplo de Plato con Alérgenos (JSON)</h2>
        {platosConAlergenos.length > 0 && (
          <pre style={styles.json}>
            {JSON.stringify(platosConAlergenos[0], null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  section: {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #ddd'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px'
  },
  headerRow: {
    backgroundColor: '#8B2C1F',
    color: '#fff'
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd'
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd'
  },
  label: {
    fontWeight: 'bold',
    paddingRight: '20px'
  },
  value: {
    color: '#8B2C1F',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  code: {
    backgroundColor: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontFamily: 'monospace',
    fontSize: '12px'
  },
  json: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    overflow: 'auto',
    fontSize: '12px',
    fontFamily: 'monospace'
  },
  checkList: {
    lineHeight: '1.8',
    fontSize: '14px'
  },
  imageGrid: {
    display: 'flex',
    gap: '20px',
    marginTop: '15px',
    flexWrap: 'wrap'
  },
  imageCard: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    border: '1px solid #ddd'
  }
};

export default DebugAllergens;
