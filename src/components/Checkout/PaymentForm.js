import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

//Obtaining stripePromise data from stripe by unique stripe key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
                                //Destructuring props
const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => {

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        //Obtaining cardElements from stripe
        const cardElement = elements.getElement(CardElement);
        // const card = elements.create('card');


        //Obtaining paymentMethod data from stripe from cardElements created above
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });


        if (error) {
            console.log('[error]', error);
        } else {
            //Assigning the data of this form whose values come from the shippingData, paymentMethod, and checkoutToken
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
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            }
            //Sending the data as arguments through props method from App.js component
            //to be passed into Commerce.js/ capture method
            onCaptureCheckout(checkoutToken.id, orderData);

            //Then sending the view to the next step which is the confirmation page 
            nextStep();
        }
    };

    const onSubmit = (e, elements, stripe) => {
        handleSubmit(e, elements, stripe)
    }
    
    return (
        <>
            <Review checkoutToken={checkoutToken}/>
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
            <Typography variant='subtitle1' >
                *For demo purposes only! For card information just use the numbers below*
            </Typography>
            <Typography variant='subtitle1'>
            4242-4242-4242-4242  (04/24)  (424)  (42424)  
            </Typography>
            {/* The values of the card information fields in the form are submitted and sent into handleSubmit method above */}
            <Elements stripe={stripePromise} stripePromise={stripePromise}  >
                <ElementsConsumer stripe={stripePromise} stripePromise={stripePromise}>
                    {({ elements, stripe }) => (
                    <form onSubmit={(e) => onSubmit(e, elements, stripe)}>
                        <CardElement stripe={stripePromise}stripePromise={stripePromise}/>
                        <br/> 
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={() => backStep()}>Back</Button>
                            <Button 
                            type='submit' variant="contained" color="primary">
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