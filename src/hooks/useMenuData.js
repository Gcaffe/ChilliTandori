import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Hook personalizado para cargar los datos de la carta
export const useMenuData = () => {
  const { currentLanguage } = useLanguage();
  const [categorias, setCategorias] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [alergenos, setAlergenos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Cargar categorias.json
        const categoriasModule = await import('../data/categorias.json');
        const categoriasData = categoriasModule.default || categoriasModule;
        
        // Cargar carta.json
        const cartaModule = await import('../data/carta.json');
        const cartaData = cartaModule.default || cartaModule;
        
        // Cargar alergenos.json
        const allergenosModule = await import('../data/alergenos.json');
        const allergenosData = allergenosModule.default || allergenosModule;

        // Obtener categorías según idioma
        const categoriasIdioma = currentLanguage === 'es' 
          ? categoriasData.es || []
          : categoriasData.en || [];

        setCategorias(categoriasIdioma);
        setPlatos(Array.isArray(cartaData) ? cartaData : []);
        setAlergenos(allergenosData || []);
        setLoading(false);
      } catch (err) {
        console.error('Error cargando datos:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, [currentLanguage]);

  return { categorias, platos, alergenos, loading, error, currentLanguage };
};

// Función helper para obtener platos de una categoría
export const getPlatosByCategoria = (platos, numCategoria) => {
  return platos.filter(plato => plato.numCate === numCategoria);
};

// Función helper para obtener nombre de alérgeno
// CAMBIADO: Usar "num" en lugar de "numAlerg"
export const getAlergenoNombre = (alergenos, numAlerg, idioma) => {
  const alergeno = alergenos.find(a => a.num === parseInt(numAlerg));
  if (!alergeno) return '';
  return idioma === 'es' ? alergeno.nombreES : alergeno.nombreEN;
};

// Función helper para parsear alérgenos desde string
export const parseAlergenos = (alergenosStr) => {
  if (!alergenosStr || alergenosStr.trim() === '') return [];
  return alergenosStr.split(',').map(a => a.trim()).filter(a => a !== '');
};
