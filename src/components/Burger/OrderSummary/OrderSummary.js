import React, {Component} from "react";
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {


    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => <li key={igKey}>
                            <span style={{textTransform: 'capitalize'}}>
                                {igKey}
                            </span>
                    : {this.props.ingredients[igKey]}
                </li>
            );

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : {this.props.totalPrice}</strong></p>
                <p>Continue to Checkout ?</p>
                <Button btnType={'Danger'} clicked={this.props.cancelOrder}>CANCEL</Button>
                <Button btnType={'Success'} clicked={this.props.continueOrder}>CONTINUE</Button>
            </Auxiliary>
        );
    }

};

export default OrderSummary;
