import React from 'react';
import { Grid } from '@material-ui/core';

import Product from '../Product/Product';

// const products = [
//     {id: 1, name: 'Shirt', description: 'Orwell T', price:'$5', image: 'https://kingteeshops.com/wp-content/uploads/2020/08/I-Told-You-George-Orwell-Sweatshirt.png', },
//     {id: 2, name: 'Pants', description: 'Cheffies', price:'$20', image: 'https://www.chefuniforms.com/img/products/600x1020/9701htw.jpg',}
// ];

const Products = ({ products, addToCart }) => {
    return (
        <main>
            <Grid container justify='center' spacing={4} >
                {products.map(product =>
                    <Grid key={product.id} item xs={12} sm={4} lg={3} >
                        <Product product={product} addToCart={addToCart} />
                    </Grid>
                )}
            </Grid>

        </main>
    )
}

export default Products;