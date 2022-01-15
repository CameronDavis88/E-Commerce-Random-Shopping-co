// import React, { useEffect } from 'react';
// import { Typography, Button, Divider } from '@material-ui/core';
// import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// import Review from './Review';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

// const PaymentForm = ({ checkoutToken, shippingData, backStep, onCaptureCheckout, nextStep }) => {

//     useEffect(() => {
//         // console.log(shippingData)
//         // console.log(checkoutToken)
//         // console.log(onCaptureCheckout)
//     }, []);

//     const handleSubmit = async function (e, elements, stripe) {
//         e.preventDefault();
//         if (!stripe || !elements) return;
//         const cardElement = elements.getElement(CardElement);

//         const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

//         if (error) {
//             console.log('[ERROR]', error);
//         } else {
//         console.log(orderData)

//             const orderData = {
//                 line_items: checkoutToken.live.line_items,

//                 customer: {
//                     firstname: shippingData.firstName,
//                     lastname: shippingData.lastName,
//                     email: shippingData.email,
//                 },

//                 shipping: {
//                     name: 'Primary',
//                     street: shippingData.address1,
//                     town_city: shippingData.city,
//                     county_state: shippingData.shippingSubdivision,
//                     postatl_zip_code: shippingData.shipping.zip,
//                     country: shippingData.shippingCountry,
//                 },

//                 fulfillment: { shipping_method: shippingData.shippingOption },

//                 payment: {
//                     gateway: 'stripe',
//                     stripe: { payment_method_id: paymentMethod.id }
//                 },
//             }

//             onCaptureCheckout(checkoutToken.id, orderData);
//             nextStep();
//         }
//     }

//     return (
//         <>
//             <Review checkoutToken={checkoutToken} />
//             <Divider />
//             <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}  >Payment method</Typography>
//             <Elements stripe={stripePromise}>
//                 <ElementsConsumer>
//                     {({ elements, stripe }) => (
//                         <form stripe={stripe} elements={elements} onSubmit={(e) => handleSubmit(e, elements, stripe)}>
//                             <CardElement />
//                             <br /> <br />
//                             <div style={{ display: 'flex', justifyContent: 'space-between' }} >
//                                 <Button variant='outlined' onClick={() => backStep()} >Back</Button>
//                                 <Button onClick={() => nextStep()} type='submit' variant='contained' disabled={!stripe} color='primary' >
//                                     Pay {checkoutToken.live.subtotal.formatted_with_symbol}
//                                 </Button>
//                             </div>
//                         </form>
//                     )}
//                 </ElementsConsumer>
//             </Elements>
//         </>
//     );
// }

// export default PaymentForm;




// billing.name: The Billing contact name field is required when customer.id is not present.
// index.js:1 billing.street: The Billing street address field is required when customer.id is not present.
// index.js:1 billing.town_city: The Billing town/city field is required when customer.id is not present.
// index.js:1 billing.postal_zip_code: The Billing postal/ZIP code field is required when customer.id is not present.
// index.js:1 billing.county_state: The Billing county/state/province field is required when customer.id is not present.
// index.js:1 billing.country: The Billing country field is required when customer.id is not present.
// index.js:1 payment.gateway: The selected payment.gateway is invalid.



import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => {


    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
        console.log(paymentMethod)

        if (error) {
            console.log('[error]', error);
        } else {

            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email
                },
                shipping: {
                    name: shippingData.shippingOption,
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                billing: {
                    name: shippingData.firstName,
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state:  shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                      payment_intent_id: paymentMethod.id,
                    },
                  },
                pay_what_you_want: checkoutToken.live.subtotal.formatted
            }


            //   const orderData = {
            //     line_items: checkoutToken.live.line_items,
            //     customer: { firstname: shippingData.firstName, 
            // lastname: shippingData.lastName,
            //  email: shippingData.email },
            //     shipping: { name: 'International',
            //  street: shippingData.address1,
            //   town_city: shippingData.city, 
            //   county_state: shippingData.shippingSubdivision,
            //    postal_zip_code: shippingData.zip,
            //     country: shippingData.shippingCountry },
            //     fulfillment: { shipping_method: shippingData.shippingOption },
            //     payment: {
            //       gateway: 'stripe',
            //       stripe: {
            //         payment_method_id: paymentMethod.id,
            //       },
            //     },
            //   };

            onCaptureCheckout(checkoutToken.id, orderData);

            nextStep();
        }
    };

    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>{({ elements, stripe }) => (
                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                        <CardElement />
                        <br /> <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={backStep}>Back</Button>
                            <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                            </Button>
                        </div>
                    </form>
                )}
                </ElementsConsumer>
            </Elements>
        </>
    );
};

export default PaymentForm;