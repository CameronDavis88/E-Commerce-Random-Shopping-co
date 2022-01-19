import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles'

const CartItem = ({ item, updateCartQty, removeFromCart }) => {
    const { name, image, price, quantity, id } = item;
    const classes = useStyles();
    return (
        <Card >
            <CardMedia alt={name} className={classes.media} >
                <img src={image.url} className='cartItemImage' alt={name}/>
            </CardMedia>
            <CardContent className={classes.cardContent} >
                <Typography variant='h5' >{name} </Typography>
                <Typography variant='h5' >{price.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cartActions} >
                <div className={classes.buttons} >
                    <Button type='button' size='small' onClick={() => updateCartQty(id, quantity - 1)} variant='outlined' >-</Button>
                    <Typography variant='h5' >{quantity}</Typography>
                    <Button type='button' size='small' onClick={() => updateCartQty(id, quantity + 1)} variant='outlined' >+</Button>
                </div>
                <Button onClick={() => removeFromCart(id)} variant='contained' type='button' color='secondary' >Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem;
