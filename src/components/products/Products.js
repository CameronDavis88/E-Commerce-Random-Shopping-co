import React from 'react';
import {Grid} from '@material-ui/core';

import Product from '../product/Product';

const products = [
    {id: 1, name: 'Shirt', description: 'Orwell T', price:'$5', image: '', },
    {id: 2, name: 'Pants', description: 'Cheffies', price:'$20', image: '',}
];

const Products = () => {
    return(
        <main>
         {products.map(product => 
                   <Grid key={product.id} >
                       {/* sending individual objects as it maps through array and sending it to
                       Product through props */}
                       <Product product={product}/>
                   </Grid>
            )}
     
    </main>
    )
}

export default Products;