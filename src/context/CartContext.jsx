import React, { createContext, useState, useEffect } from "react";

// ১. CartContext এক্সপোর্ট করা
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // কার্টে প্রোডাক্ট যোগ করা
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.some((item) => item.id === product.id);
      if (exists) return prevCart;
      return [...prevCart, product];
    });
  };

  // কার্ট থেকে প্রোডাক্ট রিমুভ করা
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // কার্ট খালি করা
  const clearCart = () => {
    setCart([]);
  };

  // সর্বমোট মূল্য হিসাব
  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
