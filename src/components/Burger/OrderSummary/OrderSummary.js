import React from "react";
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>
                {igKey}
            </span>
            : {props.ingredients[igKey]}
        </li>
        );

    return <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious bburger with the following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total Price : {props.totalPrice}</strong></p>
        <p>Continue to Checkout ?</p>
        <Button btnType={'Danger'} clicked={props.cancelOrder}>CANCEL</Button>
        <Button btnType={'Success'} clicked={props.continueOrder}>CONTINUE</Button>
    </Auxiliary>
};

export default orderSummary;
