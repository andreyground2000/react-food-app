import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = ({ onCartOpen }) => {
  const cartCtx = useContext(CartContext)
  const [isButtonHighlighted, setButtonHighlighted] = useState(false)

  const { items } = cartCtx
  const itemsNumber = items.reduce((acc, item) => acc += item.amount, 0)
  const btnClasses = `${classes.button} ${isButtonHighlighted ? classes.bump : ''}`

  useEffect(() => {
    if (items.length < 1) {
      return
    }

    const timer = setTimeout(() => {
      setButtonHighlighted(true)
    }, 300)

    return () => {
      clearInterval(timer)
      setButtonHighlighted(false)
    }
  }, [items])

  return (
    <button className={btnClasses} onClick={onCartOpen}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemsNumber}</span>
    </button>
  )
}

export default HeaderCartButton;