import React, {Component} from "react";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import * as actions from '../../../store/actions/index';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class Logout extends Component{

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to={'/'} />;
    }

}

const dispatchStateToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout())
    }
}


export default connect(null, dispatchStateToProps)(Logout);
