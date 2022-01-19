import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart, updateCartQty, emptyCart, removeFromCart }) => {
    const isEmpty = !cart.line_items.length;
    const classes = useStyles();

    const EmptyCart = () => {
        return (
            <Typography variant='h5'>
                Your cart is currently empty:  
                <Link  className={classes.link} to="/"> Continue Shopping?</Link>
            </Typography>  
        )
    }

    const FilledCart = () => {
        return (
            <div >
                <Grid container spacing={3}>
                    {cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} updateCartQty={updateCartQty} removeFromCart={removeFromCart} />
                        </Grid>
                    ))}
                </Grid>
                <div>
                    <Typography variant='h4' >
                        Subtotal: {cart.subtotal.formatted_with_symbol}
                        <div>
                            <Button className={classes.emptyButton} onClick={emptyCart} size='medium' type='button' 
                            variant='contained' color='secondary'>Empty Cart</Button>
                            <Button className={classes.checkoutButton} component={Link} to="/" size='medium'
                             type='button' variant='contained' color='secondary' >Continue Shopping</Button>
                            <Button className={classes.checkoutButton} component={Link} to="checkout" size='medium'
                             type='button' variant='contained' color='primary' >Checkout</Button>
                        </div>
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <Container >
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h3' gutterBottom >Your Shopping Cart:</Typography>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart;
