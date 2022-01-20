import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart, EcoTwoTone } from '@material-ui/icons';
import useStyles from './styles';

const Product = ({ product, addToCart }) => {
    //Assigning the styles from the styles file imported above to the variable classes
    const classes = useStyles();
    // Destructuring properties from product from props which is per object as it is mapped in Products
    const { name, price, image, description, id } = product;
    return (
        //Rendering the details of the product (title, image, description etc.) as passes down from props
        <div className={classes.box}>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={name} />
                <CardContent>
                    <div>
                        <Typography variant='h5' gutterBottom component='h2'> {name} </Typography>
                        <img className='item-image' src={image.url} alt={name} />
                        <Typography variant='h5' component='h2'>{price.formatted_with_symbol}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    {/* Adds one item of the given product to the user's cart */}
                    <IconButton aria-label='Add to Cart' onClick={() => addToCart(id, 1)}>
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default Product;
