import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMenuData } from '../hooks/useMenuData';
import DishModal from './DishModal';
import destacadosData from '../data/destacados.json';

const FeaturedDishes = () => {
  const { currentLanguage } = useLanguage();
  const { alergenos } = useMenuData();
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(null);

  const handleDishClick = (plato) => {
    setSelectedDish(plato);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  const getText = (key) => {
    const texts = {
      title: {
        es: 'Lo más popular',
        en: 'Most Popular'
      }
    };
    return texts[key][currentLanguage];
  };

  return (
    <section className="featured-dishes">
      <div className="container">
        <h2 className="featured-dishes-title font-logo">{getText('title')}</h2>
        
        <div className="featured-dishes-grid">
          {destacadosData.map((plato) => {
            const nombre = currentLanguage === 'es' ? plato.nombreES : plato.nombreEN;
            const imagePath = `/images/carta/${plato.numPlato}.jpg`;

            return (
              <div 
                key={plato.id}
                className="featured-dish-card"
                onClick={() => handleDishClick(plato)}
              >
                {/* Imagen */}
                <div className="featured-dish-image-container">
                  <img 
                    src={imagePath}
                    alt={nombre}
                    className="featured-dish-image"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="250"%3E%3Crect fill="%23f5f5f5" width="250" height="250"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3ESin foto%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                {/* Nombre y precio */}
                <div className="featured-dish-info">
                  <h3 className="featured-dish-name">{nombre}</h3>
                  <span className="featured-dish-price">{plato.precio.toFixed(2)}€</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de detalle */}
      <DishModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        plato={selectedDish}
        alergenos={alergenos}
      />
    </section>
  );
};

export default FeaturedDishes;
