import { useState, useEffect } from 'react';

const TestImages = () => {
  const [imageStatus, setImageStatus] = useState({});

  // Lista de imágenes a probar
  const imagesToTest = [
    '/images/general/INI_1.jpg',
    '/images/general/INI_2.jpg',
    '/images/general/INI_3.jpg',
    '/images/general/INI_4.jpg',
    '/images/general/INI_5.jpg',
    '/images/general/INI_6.jpg',
    // Prueba también con .jpeg por si acaso
    '/images/general/INI_1.jpeg',
    '/images/general/INI_2.jpeg',
    '/images/general/INI_3.jpeg',
    '/images/general/INI_4.jpeg',
    '/images/general/INI_5.jpeg',
    '/images/general/INI_6.jpeg',
  ];

  useEffect(() => {
    const testImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ src, status: 'OK', width: img.width, height: img.height });
        img.onerror = () => resolve({ src, status: 'ERROR' });
        img.src = src;
      });
    };

    Promise.all(imagesToTest.map(testImage)).then((results) => {
      const status = {};
      results.forEach((result) => {
        status[result.src] = result;
      });
      setImageStatus(status);
    });
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1 style={{ marginBottom: '30px' }}>🔍 Test de Imágenes del Carrusel</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>📊 Resultados:</h2>
        {Object.keys(imageStatus).length === 0 ? (
          <p>Cargando...</p>
        ) : (
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Ruta</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Estado</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Dimensiones</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(imageStatus).map(([src, info]) => (
                <tr key={src}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', fontSize: '12px' }}>{src}</td>
                  <td style={{ 
                    border: '1px solid #ddd', 
                    padding: '8px', 
                    textAlign: 'center',
                    backgroundColor: info.status === 'OK' ? '#d4edda' : '#f8d7da',
                    color: info.status === 'OK' ? '#155724' : '#721c24',
                    fontWeight: 'bold'
                  }}>
                    {info.status === 'OK' ? '✅ OK' : '❌ ERROR'}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontSize: '12px' }}>
                    {info.status === 'OK' ? `${info.width} x ${info.height}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h2>🖼️ Vista previa (solo las que funcionan):</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {Object.entries(imageStatus)
            .filter(([_, info]) => info.status === 'OK')
            .map(([src, info]) => (
              <div key={src} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                <img src={src} alt={src} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <p style={{ fontSize: '11px', marginTop: '8px', wordBreak: 'break-all' }}>{src}</p>
                <p style={{ fontSize: '10px', color: '#666' }}>{info.width} x {info.height} px</p>
              </div>
            ))}
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#fff3cd', border: '1px solid #ffc107', borderRadius: '5px' }}>
        <h3>💡 Instrucciones:</h3>
        <ol>
          <li>Esta página prueba todas las imágenes INI_*.jpg e INI_*.jpeg</li>
          <li>Las que muestran ✅ OK están correctas</li>
          <li>Las que muestran ❌ ERROR no se encuentran</li>
          <li>Verifica los nombres exactos de tus archivos y actualiza Inicio.jsx</li>
        </ol>
      </div>
    </div>
  );
};

export default TestImages;
