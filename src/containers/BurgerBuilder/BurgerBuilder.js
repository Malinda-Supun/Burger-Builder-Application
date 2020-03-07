import React, {Component} from "react";
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = oldCount + 1;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = oldCount - 1;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el
        }, 0);


        // console.log(sum);

        this.setState({purchasable: sum > 0})
        // console.log(this.state.purchasable);

    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You Continue!');
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  cancelOrder={this.purchaseCancelHandler}
                                  continueOrder={this.purchaseContinueHandler}
                                  totalPrice={this.state.totalPrice}
                    />
                </Modal>
                {/*Burger image*/}
                <Burger ingredients={this.state.ingredients}/>

                {/*Burger Build Controls*/}
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;
