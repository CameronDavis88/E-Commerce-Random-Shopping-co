import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css'

const NavBar = ({ totalItemsInCart }) => {
    // console.log(totalItemsInCart)
    const location = useLocation();

    return (
        <div className='navBar'>
            <AppBar>
                <Toolbar>
                    <Typography component={Link} to="/" >
                        {/* <img src={} alt="Commerce.js" />  I don't have an image yet */}
                        --Brand name label here--
                    </Typography>
                    <div className='spaceMaker' />
                    {location.pathname === "/" && (
                        <div>
                            <IconButton component={Link} to="/cart" >
                                <Badge badgeContent={totalItemsInCart} >
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
