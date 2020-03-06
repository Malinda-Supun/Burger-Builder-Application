import React from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import  './Layout.css';


const layout = (props) => (

    //Toolbar SideDrawer BackDrop
    <Auxiliary>
        {/*<div>Toolbar SideDrawer BackDrop</div>*/}
        <Toolbar/>
        <main className={'Content'}>
            {props.children}
        </main>
    </Auxiliary>
);

export default layout;


