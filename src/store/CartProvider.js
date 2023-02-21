import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const handleCartState = (state, action) => {
  const itemsForUpdate = [...state.items]

  if (action.type === 'ADD') {
    const existedItemIndex = itemsForUpdate.findIndex(item => item.id === action.item.id)

    if (existedItemIndex > -1) {
      const existedItem = itemsForUpdate[existedItemIndex]
      const updatedItem = {...existedItem, amount: existedItem.amount + action.item.amount }
      itemsForUpdate[existedItemIndex] = updatedItem 
    } else {
      itemsForUpdate.push(action.item)
    }
    
    return {
      items: itemsForUpdate,
      totalAmount: state.totalAmount + action.item.price * action.item.amount
    }
  }

  if (action.type === 'REMOVE') {
    const existedItemIndex = itemsForUpdate.findIndex(item => item.id === action.id)
    const existedItem = itemsForUpdate[existedItemIndex]

    if (existedItem.amount === 1) {
      itemsForUpdate.splice(existedItemIndex, 1)
    } else {
      itemsForUpdate[existedItemIndex] = {...existedItem, amount: --existedItem.amount}
    }

    return {
      items: itemsForUpdate,
      totalAmount: state.totalAmount - existedItem.price
    }
  }

  if (action.type === 'CLEAR') {
    return defaultCartState
  }

  return defaultCartState
}

const CartProvider = (props) => {
  const [cartState, setCartState] = useReducer(handleCartState, defaultCartState)

  const addItemToCart = (item) => {
    setCartState({
      type: 'ADD',
      item
    })
  }

  const removeItemFromCart = (id) => {
    setCartState({
      type: 'REMOVE',
      id
    })
  }

  const clearItems = () => {
    setCartState({
      type: 'CLEAR'
    })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart: clearItems
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;