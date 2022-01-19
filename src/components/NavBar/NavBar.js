import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './styles';
import logo from '../../images/logo.png';

const NavBar = ({ totalItemsInCart }) => {
    const location = useLocation();
    const classes = useStyles();

    return (
        <div className='navBar'>
            <AppBar position='fixed' color='primary' className={classes.appBar}>
                <Toolbar>
                    <Typography component={Link} to="/" variant='h6' color='inherit' className='classes.title'>
                        <img  src={logo} alt="logo" height='20px'/>  
                        The Random Shopping Co.
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname === "/" && (
                        <div>
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
