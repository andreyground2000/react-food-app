import React, { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmptyCheck = (value) => value.trim().length === 0
const isFiveCharsCheck = (value) => value.trim().length === 5

const Checkout = (props) => {
  const nameInput = useRef();
  const streetInput = useRef();
  const postalInput = useRef();
  const cityInput = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  })

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameInput.current.value;
    const street = streetInput.current.value;
    const postal = postalInput.current.value;
    const city = cityInput.current.value;

    const nameIsValid = !isEmptyCheck(name);
    const streetIsValid = !isEmptyCheck(street);
    const postalIsValid = isFiveCharsCheck(postal);
    const cityIsValid = !isEmptyCheck(city);

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid
    })

    const formIsValid =  nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (formIsValid) {
      props.onSubmit({
        name,
        street,
        postal,
        city
      })
      
    }
  };


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${!formInputsValidity.name ? classes.invalid : ''}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInput} />
        {!formInputsValidity.name && <p>Please insert correct name</p>}
      </div>
      <div className={`${classes.control} ${!formInputsValidity.street ? classes.invalid : ''}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInput} />
        {!formInputsValidity.street && <p>Please insert correct street</p>}        
      </div>
      <div className={`${classes.control} ${!formInputsValidity.postal ? classes.invalid : ''}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInput} />
        {!formInputsValidity.postal && <p>Please insert correct postal code</p>}
      </div>
      <div className={`${classes.control} ${!formInputsValidity.city ? classes.invalid : ''}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInput}/>
        {!formInputsValidity.city && <p>Please insert correct city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCloseCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;