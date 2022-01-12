import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';

import AddressForm from './AddressFrom';
import PaymentForm from './PaymentFrom';
import { commerce } from '../../library/commerce';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart }) => {
    const [activeStep, setActiveStep] = useState(0);

    const [checkoutToken, setCheckoutToken] = useState('');

    useEffect(
        () => {
        const generateToken = async function(){
            try{
                const token = await commerce.checkout.generateToken(cart.id, { type:'cart' });
                // console.log(token);
                setCheckoutToken(token);
            } catch(error) {

            }
        }
        generateToken();
    }, [cart]);

    const ConfirmationForm = () => {
        return (
            <div>Confirmation Form</div>
        )

    }


    //conditionally rendering the form
    const Form = () => (
        activeStep === 0
            ? <AddressForm checkoutToken={checkoutToken} />
            : <PaymentForm />
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
                {activeStep === steps.length ? <ConfirmationForm /> : checkoutToken && <Form />}
            </main>
        </>
    )
}

export default Checkout;
