import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
         /*   const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1}
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            }
            return updateObject(state, updatedState);*/

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] -1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS: {
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false
            }
        }
        case actionTypes.FETCH_INGREDIENT_FAILED: {
            // return updateObject(state, {error: true})
            return {
                ...state,
                error: true
            }
        }
    }

    return state;
}

export default burgerBuilderReducer;
