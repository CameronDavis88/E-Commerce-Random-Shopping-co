import React from 'react';
import { AppBar, Toolbar,IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import './NavBar.css'

const NavBar = ({ totalItemsInCart }) => {
    console.log(totalItemsInCart)
    return (
        <div className='navBar'>
            <AppBar>
                <Toolbar>
                    <Typography>
                        {/* <img src={} alt="Commerce.js" />  I don't have an image yet */}
                        --Brand name label here--
                    </Typography>
                    <div className='spaceMaker' />
                    <div>
                        <IconButton>
                            <Badge badgeContent={totalItemsInCart} >
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
