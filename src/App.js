import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Redirect, Route, Switch} from 'react-router-dom';
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import * as actions from './store/actions/index';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
    return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
    return import("./containers/Orders/Orders");
})

const asyncAuth = asyncComponent(() => {
    return import("./containers/Auth/Auth");
})


class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {

        let routes = (
            <switch>
                <Route path={'/auth'} component={asyncAuth}/>
                <Route path={'/'} exact component={BurgerBuilder}/>
                <Redirect to={'/'} />
            </switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path={'/checkout'} component={asyncCheckout}/>
                    <Route path={'/orders'} component={asyncOrders}/>
                    <Route path={'/logout'} component={Logout}/>
                    <Route path={'/auth'} component={asyncAuth}/>
                    <Route path={'/'} exact component={BurgerBuilder}/>
                </Switch>
            );

        }

        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
