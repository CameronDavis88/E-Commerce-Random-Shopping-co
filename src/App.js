import React, { useState, useEffect } from 'react';
import { commerce } from './library/commerce';
import { Products, NavBar } from './components';

const App = () => {
    // React Hook States
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    // I did the async as an arrow function but it did not work, but this anonymous one does.
    const fetchProducts = async function() {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async function() {
        setCart(await commerce.cart.retrieve());
    }    

    // const onAddToCart = async function(productId, quantity) {
    //     const item = await commerce.cart.add(productId, quantity);
    //     setCart(item.cart);
    //     console.log(cart)
    // }  

    const onAddToCart = (productId, quantity) => {
        setCart(commerce.cart.add(productId, quantity));
    console.log(cart)
    }  
 

// Like componentDidMount for react hooks
    useEffect(() => {
fetchProducts();
fetchCart();
    }, []);
    
    return (
        <div>
            <NavBar/>
            <Products products={products} cart={cart} addToCart={onAddToCart}/>
        </div>
    )
}

export default App;
