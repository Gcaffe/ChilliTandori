import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import './i18n'; // Inicializar i18n

// Importar páginas
import Inicio from './pages/Inicio';
import Nosotros from './pages/Nosotros';
import Carta from './pages/Carta';
import Contactar from './pages/Contactar';

// Importar componentes comunes
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/carta" element={<Carta />} />
                <Route path="/contactar" element={<Contactar />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
