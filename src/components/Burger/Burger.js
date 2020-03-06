import React from "react";
import './Burger.css';
import BurgerIngredients from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {

    let transformIngredients = Object.keys(props.ingredients)
        .map(ingredient => {
            return [...Array(props.ingredients[ingredient])].map((_, i) => {
                return <BurgerIngredients key={ingredient+i} type={ingredient}/>
            });
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    if(transformIngredients.length === 0){
        transformIngredients = <p>Please Start Adding Ingredients!</p>;
    }

    return (
        <div className={'Burger'}>
            <BurgerIngredients type={'bread-top'} />
            {transformIngredients}
            <BurgerIngredients type={'bread-bottom'} />
        </div>
    );
}

export default burger;
