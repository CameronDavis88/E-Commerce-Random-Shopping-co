import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart, CallMissedSharp } from '@material-ui/icons';
// import { useStyles } from './styles';

const Product = ({ product }) => {
    // this was the way the demonstration did css see useStyles imported above and styles.js file
    // const classes = useStyles();
    // destructuring properties from product from props which is per object as it is mapped in Products
    const {id, name, description, price, image} = product;
    return (
        <Card 
        // className={classes.root}
        >
            <CardMedia 
            // className={classes.media}
            image={image}
            title={name} />
            <CardContent>
                <div
                //  className={classes.CardContent}
                 >
                    <Typography gutterBottom> {name} </Typography >
                    <Typography > { price } </Typography>
                    <Typography > { description } </Typography>
                </div>
            </CardContent>
            <CardActions 
            // className={classes.CardActions}
            >
                <IconButton aria-label='Add to Cart'>
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product;
