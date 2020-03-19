import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.id
    }
    return updateObject(state, {
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true
    });
}

const purchaseBurgerFailure = (state, action) => {
    return updateObject(state, {loading: false});
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {loading: true});
}

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased: false});
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, {loading:true});
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });

}

const fetchOrderFail = (state, action) => {
    return updateObject(state, {loading: false})
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);

        case actionTypes.PURCHASE_BURGER_FAILURE: return purchaseBurgerFailure(state, action);

        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);

        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);

        case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action);

        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);

        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action);

        default: return state
    }
}

export default orderReducer;
