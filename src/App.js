import React, { useState, useEffect, Component } from 'react';
import { commerce } from './library/commerce';
import { Products, NavBar, Cart } from './components';

const App = () => {
    // React Hook States
    const [products, setProducts] = useState([]);
    // const [cart, setCart] = useState({});
    // I did not fully understand why, but the hook below works when the one above did not--something to do with when things first render and cart not returning and thus no line_items etc.
    const [cart, setCart] = useState({ line_items: [] });

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

    const onAddToCart = async function(productId, quantity) {
        setCart(await commerce.cart.add(productId, quantity));
        console.log(cart.line_items)
    }

    // emptyCart = () => {

    // }

    console.log(cart)

    // Like componentDidMount for react hooks
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <div>
            <NavBar totalItemsInCart={cart.total_items} />
            <Products products={products} cart={cart} addToCart={onAddToCart} />
            <Cart cart={cart} />
        </div>
    )
}

export default App;
