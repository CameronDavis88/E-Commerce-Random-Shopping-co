import React, { useState, useEffect } from 'react';
import { commerce } from './library/commerce';
import { Products, NavBar, Cart, Checkout } from './components';
// import Review from './components/Checkout/Review';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { Repeat } from '@material-ui/icons';


const App = () => {
    // React Hook States
    const [products, setProducts] = useState([]);
    // const [cart, setCart] = useState({});
    // I did not fully understand why, but the hook below works when the one above did not--something to do with when things first render and cart not returning and thus no line_items etc.
    const [cart, setCart] = useState({ line_items: [] });
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    // I did the async as an arrow function but it did not work, but this anonymous one does.
    const fetchProducts = async function () {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async function () {
        setCart(await commerce.cart.retrieve());
    }

    // const onAddToCart = async function(productId, quantity) {
    //     const item = await commerce.cart.add(productId, quantity);
    //     setCart(item.cart);
    //     console.log(cart)
    // }  

    const onAddToCart = async function (productId, quantity) {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
        // console.log(cart.line_items)
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

    const refreshCart = async function(){
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCaptureCheckout = async function(checkoutTokenId, newOrder){
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch(error){
            setErrorMessage(error.data.error.message);
        }
    }

    // console.log(cart)

    // Like componentDidMount for react hooks
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
            <div>
                <NavBar totalItemsInCart={cart.total_items} />
                <Switch>
                    <Route exact path="/" >
                        <Products products={products} cart={cart} addToCart={onAddToCart} />
                    </Route>
                    <Route path="/cart" >
                        <Cart cart={cart}
                            updateCartQty={updateCartQty}
                            removeFromCart={removeFromCart}
                            emptyCart={emptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout" >
                        <Checkout cart={cart} 
                        order={order}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={errorMessage}
                        />
                    </Route>
                    {/* <Route  path="/checkout/review" >
                            <Review />
                    </Route> */}
                </Switch>
            </div>
        </Router>

    )
}

export default App;
