import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

const CartItem = ({ item }) => {
    return (
        <Card>
           
            <CardMedia   alt={item.name}  >
                <img src={item.image.url} className='cartItemImage' />
            </CardMedia>
            <CardContent >
                <Typography variant='h4' >{item.name} </Typography>
                <Typography variant='h5' >{item.price.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions>
                <div className='buttons' >
                    <Button type='button' color='primary' size='small'>-</Button>
                    <Typography variant='h6' >{item.quantity}</Typography>
                    <Button type='button' color='primary' size='small'>+</Button>
                </div>
                <Button variant='contained' type='button' color='secondary' >Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem;
