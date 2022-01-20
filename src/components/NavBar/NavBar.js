import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './styles';
import logo from '../../images/logo.png';

const NavBar = ({ totalItemsInCart }) => {
    const location = useLocation();
    //Assigning the styles from the styles file imported above to the variable classes
    const classes = useStyles();

    return (
        <div className='navBar'>
            <AppBar position='fixed' color='primary' className={classes.appBar}>
                <Toolbar>
                    <Typography component={Link} to="/" variant='h6' color='inherit' className='classes.title'>
                        <img  src={logo} alt="logo" height='20px'/>  
                        The Random Shopping Co.
                    </Typography>
                    {/* div below separates the brand name on left from cart icon on thr right */}
                    <div className={classes.grow}/>
                    {/* Conditional rendering of cart: displays if on home page, but does not when in cart--utilizing location pathname */}
                    {location.pathname === "/" && (
                        <div>
                            {/* Icon dynamically displays the number of items with the cart as sent from props */}
                            <IconButton component={Link} to="/cart">
                            <Typography >Your Cart</Typography>
                                <Badge badgeContent={totalItemsInCart} color='secondary'>
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
