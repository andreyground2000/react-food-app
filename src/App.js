import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [isCartOpen, setCartOpen] = useState(false);

  const closeCart = () => {
    setCartOpen(false)
  }

  const openCart = () => {
    setCartOpen(true)
  }

  return (
    <CartProvider>
      {isCartOpen && <Cart onCloseCart={closeCart}/>}
      <Header onCartOpen={openCart} />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
