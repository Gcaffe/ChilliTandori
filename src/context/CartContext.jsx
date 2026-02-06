import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Añadir plato al carrito
  const addToCart = (plato) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.numPlato === plato.numPlato);
      if (exists) {
        // Ya existe, incrementar cantidad
        return prev.map(item =>
          item.numPlato === plato.numPlato
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Nuevo plato, cantidad = 1
        return [...prev, { ...plato, quantity: 1 }];
      }
    });
  };

  // Quitar plato del carrito
  const removeFromCart = (numPlato) => {
    setCartItems(prev => prev.filter(item => item.numPlato !== numPlato));
  };

  // Incrementar cantidad
  const incrementQuantity = (numPlato) => {
    setCartItems(prev =>
      prev.map(item =>
        item.numPlato === numPlato
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrementar cantidad
  const decrementQuantity = (numPlato) => {
    setCartItems(prev =>
      prev.map(item =>
        item.numPlato === numPlato && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Verificar si un plato está en el carrito
  const isInCart = (numPlato) => {
    return cartItems.some(item => item.numPlato === numPlato);
  };

  // Calcular total de platos
  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Calcular precio total
  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
  };

  // Limpiar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    isInCart,
    getTotalItems,
    getTotalPrice,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
