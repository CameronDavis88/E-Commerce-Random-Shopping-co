import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';

const Cart = ({ cart }) => {
    console.log(cart)
    const isEmpty = !cart.line_items.length;
    

    const EmptyCart = () => {
        return(
            <Typography variant='subtitle1'>Your cart is currently empty</Typography>
        )
        
    }

    const FilledCart = () => {
       return(
        <>
        <Grid container spacing={3}>
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                    <div>{item.quantity} {item.name} {item.price.formatted_with_symbol} </div>

                </Grid>
            ))}
        </Grid>
        <div>
            <Typography variant='h4'>
                Subtotal: {cart.subtotal.formatted_with_symbol}
                <div>
                    <Button size='large' type='button' variant='contained' color='secondary'>Empty Cart</Button>
                    <Button size='large' type='button' variant='contained' color='primary' >Checkout</Button>
                </div>
            </Typography>
        </div>
    </>
       )
    }

    return (
        <Container>
            <div className='spaceMaker' />
            <Typography variant='h3' >Your Shopping Cart</Typography>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart;
