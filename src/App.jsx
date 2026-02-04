import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import './i18n'; // Inicializar i18n

// Importar páginas (las crearemos después)
import Inicio from './pages/Inicio';
import Nosotros from './pages/Nosotros';
import Carta from './pages/Carta';
import Contactar from './pages/Contactar';
import TestImages from './pages/TestImages';
import DebugAllergens from './pages/DebugAllergens';

// Importar componentes comunes
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/carta" element={<Carta />} />
              <Route path="/contactar" element={<Contactar />} />
              <Route path="/test-images" element={<TestImages />} />
              <Route path="/debug-allergens" element={<DebugAllergens />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
