import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

const CartItem = ({ item, updateCartQty, removeFromCart }) => {
    const { name, image, price, quantity, id } = item;
    return (
        <Card>
           
            <CardMedia   alt={name}  >
                <img src={image.url} className='cartItemImage' alt={name}/>
            </CardMedia>
            <CardContent >
                <Typography variant='h4' >{name} </Typography>
                <Typography variant='h5' >{price.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions>
                <div className='buttons' >
                    <Button type='button' size='small' onClick={() => updateCartQty(id, quantity - 1)} >-</Button>
                    <Typography variant='h6' >{quantity}</Typography>
                    <Button type='button' size='small' onClick={() => updateCartQty(id, quantity + 1)}>+</Button>
                </div>
                <Button onClick={() => removeFromCart(id)} variant='contained' type='button' color='secondary' >Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem;
