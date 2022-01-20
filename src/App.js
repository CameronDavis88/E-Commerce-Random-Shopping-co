import React, { useState, useEffect } from 'react';
import { commerce } from './library/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Products, NavBar, Cart, Checkout } from './components';

const App = () => {
    // React Hook States
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    //Fetches the information of the products previously created and uploaded onto Commerce.js
    const fetchProducts = async function () {
        const { data } = await commerce.products.list();
        setProducts(data);
    }
    //Uses functionality of Commerce.js' methods to get, update, and empty Cart and add or remove items
    //from it, and then update the cart hook
    const fetchCart = async function () {
        setCart(await commerce.cart.retrieve());
    }

    const onAddToCart = async function (productId, quantity) {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
    }

    const updateCartQty = async function (productId, quantity) {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);
    }

    const removeFromCart = async function (productId) {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const emptyCart = async function () {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    }

    const refreshCart = async function () {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }
    //Sends the order through Commerce.js and saves the order in order hook
    const handleCaptureCheckout = async function (checkoutTokenId, data) {
        try {
            // const incomingOrder = 
            await commerce.checkout.capture(checkoutTokenId, data);
            // setOrder(incomingOrder);
            refreshCart();
            console.log('Success!! The next error will say that the cart is empty which is true because it was just refreshed and the page re-rendered. So all is well!')
            console.log(order.customer)
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    // Like componentDidMount for react hooks
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        //Setting the routes to the respective components' views and sending the components their respective props
        <Router>
            <div>
                <NavBar totalItemsInCart={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} cart={cart} addToCart={onAddToCart} />
                    </Route>
                    <Route path="/cart">
                        <Cart
                            cart={cart}
                            updateCartQty={updateCartQty}
                            removeFromCart={removeFromCart}
                            emptyCart={emptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout cart={cart}
                            order={order}
                            refreshCart={refreshCart}
                            onCaptureCheckout={handleCaptureCheckout}
                            error={errorMessage}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
