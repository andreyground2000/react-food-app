import React, {useEffect, useState} from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isMealsLoading, setMealsLoading] = useState(false)
  const [errorText, setError] = useState()

  const fetchMeals = async () => {
    setMealsLoading(true)

    const response = await fetch('https://react-food-app-af9e7-default-rtdb.firebaseio.com/meals.json')
    if (!response.ok) {
      throw new Error('Ooops...Something went wrong.')
    }

    const responseData = await response.json()

    let formatedMeals = [];

    for (let key in responseData ) {
      formatedMeals.push({
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price
      })
    }
    setMealsLoading(false)
    setMeals((prev) => prev.concat(formatedMeals))    
  }

  useEffect(() => {
    fetchMeals().catch(e => {
      setMealsLoading(false)
      setError(e.message)
    })
  }, [])

  if (isMealsLoading) {
    return (
      <section>
        <p className={classes.MealsLoading}>Loading...</p>
      </section>
    )
  }

  if (!isMealsLoading && errorText) {
    return (
      <section>
        <p className={classes.MealsError}>{errorText}</p>
      </section>
    )
  }

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals;
