import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = ({ onCloseCart }) => {
  const cartCtx = useContext(CartContext)

  const [isCheckoutOpen, setCheckoutOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const addItemHandler = (item) => {
    cartCtx.addItem({...item, amount: 1})
  }

  const openCheckout = () => {
    setCheckoutOpen(true)
  }

  const submitOrder = async (userData) => {
    setIsSubmitting(true)
    await fetch('https://react-food-app-af9e7-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        oreder: cartCtx.items
      })
    })
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  }

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0
  const cartItems = (
  <ul className={classes['cart-items']}>
    {cartCtx.items.map((item) => 
      <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onAdd={addItemHandler.bind(null, item)}
        onRemove={removeItemHandler.bind(null, item.id)}
      />
    )}
  </ul>)

  const actionButtons = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={onCloseCart}>Close</button>
      {hasItems && <button className={classes.button} onClick={openCheckout}>Order</button>}
    </div>
  )

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckoutOpen && <Checkout onSubmit={submitOrder}  onCloseCart={onCloseCart}/>}
      {!isCheckoutOpen && actionButtons}      
    </>
  )

  const isSubmittingContent = (
    <p>Sending order...</p>
  )

  const didSubmitContent = (
    <>
      <p>Successfully ordered!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={onCloseCart}>Close</button>
      </div>
    </>
  )

  return (
    <Modal onCloseCart={onCloseCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && didSubmitContent}
    </Modal>
  )
}

export default Cart;