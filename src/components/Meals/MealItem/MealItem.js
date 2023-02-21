import React, { useContext } from "react";
import MealsItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

const MealItem = ({name, description, price, id}) => {
  const cartCtx = useContext(CartContext)
  const onAddToCart = (amount) => {
    cartCtx.addItem({
      id,
      name,
      amount,
      price
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{`$${price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealsItemForm onAddToCart={onAddToCart} id={id}/>
      </div>
    </li>
  )
}

export default MealItem;