import React, { useEffect } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

// const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)
const stripePromise = loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`)


const PaymentForm = ({ checkoutToken, shippingData, backStep, onCaptureCheckout, nextStep }) => {

//   const handleSubmit = async function (event, elements, stripe) {
//     event.preventDefault();
//     if(!stripe || ! elements) return;
//     const CardElement = elements.getElement(CardElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: CardElement });

//     if(error){
//         console.log(error);
//     } else{
//         const orderData = {
//             line_items: checkoutToken.live.line_items,

//             customer: {
//                     firstname: shippingData.firstname,
//                     lastname: shippingData.lastname,
//                     email: shippingData.email,
//                 },

//             shipping: {
//                 name: 'Primary',
//                 street: shippingData.address1,
//                 town_city: shippingData.city,
//                 county_state: shippingData.shippingSubdivision,
//                 postatl_zip_code: shippingData.shipping.zip,
//                 country: shippingData.shippingCountry,
//             },

//             fulfillment: { shipping_method: shippingData.shippingOption },

//             payment: {
//                 gateway: 'stripe',
//                 stripe: {payment_method_id: paymentMethod.id}
//             },
//         }

//         onCaptureCheckout(checkoutToken.id, orderData);
//         nextStep();
//     }
//   }

    return (
        <>
            <Review checkoutToken={checkoutToken} shippingData={shippingData} />
            <Divider />
            <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}  >Payment method</Typography>


            <Elements
             stripe={stripePromise}
              >
            <ElementsConsumer>
            {({ elements, stripe }) => (
                <form stripe={stripe} elements={elements}
                //  onSubmit={(e) => handleSubmit(e, elements, stripe)}
                  >
                    <CardElement/>
                    <br/> <br/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}} >
                        <Button variant='outlined' onClick={() => backStep()} >Back</Button>
                        <Button type='submit' variant='contained' disabled={!stripe} color='primary' >
                            Pay { checkoutToken.live.subtotal.formatted_with_symbol }
                        </Button>
                    </div>
                </form>
            )}
            </ElementsConsumer>
       </Elements>



        </>
    );
}

export default PaymentForm;
