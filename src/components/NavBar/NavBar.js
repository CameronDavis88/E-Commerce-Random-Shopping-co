import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { CallMissedSharp, ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './styles';
import logo from '../../images/logo.png';
import { mergeClasses } from '@material-ui/styles';



const NavBar = ({ totalItemsInCart }) => {
    const location = useLocation();
    const classes = useStyles();

    return (
        <div className='navBar'>
            <AppBar position='fixed' color='inherit' className={classes.appBar} >
                <Toolbar>
                    <Typography component={Link} to="/" variant='h6' color='inherit' className='classes.title'>
                        <img  src={logo} alt="treeLogo" height='20px' />  
                        Matonious Commerce
                    </Typography>
                    <div className='spaceMaker' />
                    {location.pathname === "/" && (
                        <div>
                            <IconButton component={Link} to="/cart">
                                <Badge badgeContent={totalItemsInCart}>
                                    <ShoppingCart />
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
