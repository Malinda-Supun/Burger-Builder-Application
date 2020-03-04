import React from 'react';
import Auxiliary from '../../hoc/Auxiliary'

const layout = (props) => (
    //Toolbar SideDrawer BackDrop
    <Auxiliary>
        <div>Toolbar SideDrawer BackDrop</div>
        <main>
            {props.children}
        </main>
    </Auxiliary>
);

export default layout;


