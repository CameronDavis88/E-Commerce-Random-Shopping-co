import React from 'react';
import { Grid } from '@material-ui/core';
import Product from '../Product/Product';

const Products = ({ products, addToCart }) => {
    return (
        <main>
            <Grid container justify='center' spacing={4}  >
                {products.map(product =>
                    <Grid key={product.id} item xs={12} sm={3} lg={4}  >
                        <Product product={product} addToCart={addToCart} />
                    </Grid>
                )}
            </Grid>

        </main>
    )
}

export default Products;