import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealsItemForm.module.css";

const MealsItemForm = ({id, onAddToCart}) => {
  const amountRef = useRef()
  const [isAmountValid, setAmountIsValid] = useState(true)

  const inputProps = {
    ref: amountRef, 
    id: 'amount' + id,
    type: 'number',
    min: '1',
    max: '5',
    step: '1',
    defaultValue: '1'
  }

  const submitFormHandler = (ev) => {
    ev.preventDefault()

    const enteredAmount = amountRef.current.value

    if (
      enteredAmount.trim().lenght === 0 ||
      +enteredAmount < 1 ||
      +enteredAmount > 5
    ) {
      setAmountIsValid(false)
      return;
    }

    onAddToCart(+enteredAmount)
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <Input label="Amount" input={inputProps}/>
      <button>+ Add</button>
      {!isAmountValid && <p>Please, enter valid amount (1-5)</p>}
    </form>
  )
}

export default MealsItemForm;