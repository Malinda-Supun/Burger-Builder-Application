import React, {Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import './Layout.css';
import {connect} from "react-redux";


class Layout extends Component {

    state = {
        showSideDrawer : false,
    };

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true})
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    render(){
        return (
            //Toolbar SideDrawer BackDrop
            <Auxiliary>
                {/*<div>Toolbar SideDrawer BackDrop</div>*/}
                <Toolbar
                    open={this.sideDrawerOpenHandler}
                    isAuth={this.props.isAuthenticate}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}
                    isAuth={this.props.isAuthenticate}
                />
                <main className={'Content'}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticate: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);


