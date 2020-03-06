import React from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import  './Layout.css';

const layout = (props) => (

    //Toolbar SideDrawer BackDrop
    <Auxiliary>
        <div>Toolbar SideDrawer BackDrop</div>
        <main className={'Content'}>
            {props.children}
        </main>
    </Auxiliary>
);

export default layout;


