import React from 'react';
import {Grid} from '@material-ui/core';

import Product from '../Product/Product';

const products = [
    {id: 1, name: 'Shirt', description: 'Orwell T', price:'$5', image: 'https://kingteeshops.com/wp-content/uploads/2020/08/I-Told-You-George-Orwell-Sweatshirt.png', },
    {id: 2, name: 'Pants', description: 'Cheffies', price:'$20', image: 'https://www.chefuniforms.com/img/products/600x1020/9701htw.jpg',}
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