import React, {Component} from "react";
import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler.js/withErrorHandle";
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {


    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner/>
        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map(order => {
                        return <Order key={order.id} ingredients={order.ingredients} totalPrice={order.price}/>
                    })}

                </div>
            );
        }
        return orders;
    }

}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const dispatchStateToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrder())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(withErrorHandler(Orders, axios));
