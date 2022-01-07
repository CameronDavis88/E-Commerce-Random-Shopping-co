import React, { useState, useEffect } from 'react';
import { commerce } from './library/commerce';
import { Products, NavBar } from './components';

const App = () => {
    const [products, setProducts] = useState([]);
    // I did the async as an arrow function but it did not work, but this anonymous one does.
    const fetchProducts = async function() {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    useEffect(() => {
fetchProducts();
    }, []);
    
    console.log(products)

    return (
        <div>
            <NavBar/>
            <Products products={products}/>
        </div>
    )
}

export default App;
