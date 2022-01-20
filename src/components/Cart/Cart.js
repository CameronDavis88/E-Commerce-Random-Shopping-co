import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart, updateCartQty, emptyCart, removeFromCart }) => {
    //Assigning the styles from the styles file imported above to the variable classes
    const classes = useStyles();
    const isEmpty = !cart.line_items.length;

    //Creating a sub-component that is conditionally displayed if the cart is empty
    const EmptyCart = () => {
        return (
            <Typography variant='h5'>
                Your cart is currently empty:  
                <Link  className={classes.link} to="/"> Continue Shopping?</Link>
            </Typography>  
        )
    }
    //Creating a sub-component that is conditionally displayed if the cart is not empty
    const FilledCart = () => {
        return (
            <div >
                <Grid container spacing={3}>
                    {/* Maps through array of items in cart and renders them in their own individual CartItem component */}
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
            {/* Conditional rendering according to if the cart is empty or not */}
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart;
