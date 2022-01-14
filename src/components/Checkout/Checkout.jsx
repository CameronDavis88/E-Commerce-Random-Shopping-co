import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';

import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { commerce } from '../../library/commerce';
// import Review from './Review';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, error, onCaptureCheckout, order }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState('');
    const [shippingData, setShippingData] = useState({});

    useEffect(
        () => {
        const generateToken = async function(){
            try{
                const token = await commerce.checkout.generateToken(cart.id, { type:'cart' });
                // console.log(token);
                setCheckoutToken(token);
            } catch(error) {
                console.log(error)
            }
        }
        // console.log(shippingData)
        generateToken();
    }, [cart]);

    const nextStep = () => {
        setActiveStep((previousActiveStep) => previousActiveStep + 1);
        console.log(shippingData)
    }
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1);

    const next = function (data) {
        setShippingData(data);
        nextStep();
    }

    const ConfirmationForm = () => {
        return (
            <div>Confirmation Form</div>
        )

    }

    //conditionally rendering the form
    const Form = () => (
        activeStep === 0
            ? <AddressForm checkoutToken={checkoutToken} next={next} nextStep={nextStep}/>
            : <PaymentForm error={error} order={order} nextStep={nextStep} checkoutToken={checkoutToken} shippingData={shippingData} backStep={backStep} onCaptureCheckout={onCaptureCheckout} />
    )

    return (
        <>
            <div className='spaceMaker' />
            <main>
                <Typography variant='h4' align='center' >Checkout</Typography>
                <Stepper activeStep={0} >
                    {steps.map(step => (
                        <Step key={step} >
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    )
                    )}
                </Stepper>

                
                
    {/* If it is in the last step display the Confirmation Form for review if not display From if token was returned*/}
                
                {activeStep === steps.length ? <ConfirmationForm  /> : checkoutToken && <Form /> }

            </main>
        </>
    )
}

export default Checkout;
