import React, {Component} from "react";
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler.js/withErrorHandle";
import { connect } from 'react-redux';
// import * as actionType from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }


 /*   addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = oldCount + 1;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }
*/
 /*
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
*/
    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el
        }, 0);

        return  sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }



    render() {

        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            console.log(key)
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummery = null;
        let burger = this.props.error ? 'Ingredients Cannot be loaded !' : <Spinner/>;

        if(this.props.ings) {
            burger = (
                <Auxiliary>
                    {/*Burger image*/}
                    <Burger ingredients={this.props.ings}/> {/*Burger Build Controls*/}

                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        totalPrice={this.props.totPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Auxiliary>


            );
            orderSummery = <OrderSummary ingredients={this.props.ings}
                                         cancelOrder={this.purchaseCancelHandler}
                                         continueOrder={this.purchaseContinueHandler}
                                         totalPrice={this.props.totPrice}
            />

            if (this.state.loading) {
                orderSummery = <Spinner/>;
            }
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummery}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const dispatchStateToProps = (dispatch) => {
    return{
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(withErrorHandler(BurgerBuilder, axios));
