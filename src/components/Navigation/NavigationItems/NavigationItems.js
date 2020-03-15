import React from "react";
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={'NavigationItems'}>
        <NavigationItem exact link={'/'} >Burger Builder</NavigationItem>
        <NavigationItem link={'/orders'}>Orders</NavigationItem>
    </ul>
);

export default navigationItems;
