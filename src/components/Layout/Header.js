import mealsImg from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = ({ onCartOpen }) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onCartOpen={onCartOpen} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImg} alt="Food"/>
      </div>
    </>
  )
}

export default Header;