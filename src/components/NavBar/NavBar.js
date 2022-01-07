import React from 'react';
import { AppBar, Toolbar,IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
const NavBar = () => {
    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography>
                        {/* <img src={} alt="Commerce.js" />  I don't have an image yet */}
                        --Brand name label here--
                    </Typography>
                    <div className='SpaceMaker'/>
                    <div>
                        <IconButton>
                            <Badge>
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
