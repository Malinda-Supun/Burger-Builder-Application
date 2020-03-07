import React, {Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import './Layout.css';


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
                <Toolbar open={this.sideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <main className={'Content'}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }

}

export default Layout;


