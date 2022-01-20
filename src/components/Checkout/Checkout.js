import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Typography, Divider, Button, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { commerce } from '../../library/commerce';
import useStyles from './styles';
//Created to keep track of stage of checkout user is on and is displayed for them by Stepper element below
const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, error, onCaptureCheckout, order, refreshCart }) => {
    //Assigning the styles from the styles file imported above to the variable classes
    const classes = useStyles();
    //React hooks
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState('');
    const [shippingData, setShippingData] = useState({});
    //re-renders when cart is updated and generates checkout token through commerce.js and assigns it to checkoutToken hook
    useEffect(
        () => {
            const generateToken = async function () {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                    setCheckoutToken(token);
                } catch (error) {
                    console.log(error)
                }
            }
            generateToken();
        }, [cart]);
    //Function created to assign the step number and increase by one when called -and sets in activeStep hook
    const nextStep = () => {
        setActiveStep((previousActiveStep) => previousActiveStep + 1);
    }
    //Does the opposite to the function above
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1);

    const next = function (data) {
        setShippingData(data);
        nextStep();
    }
    //Creation of sub-component to be conditionally rendered in the last step to confirm completion of order
    let ConfirmationForm = () =>
        <>
            <div>
                <Typography variant='h5' >Thank you for your purchase, {shippingData.firstName} {shippingData.lastName}!</Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2' >
                    *Success on mock transaction!
                </Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant='outlined' type='button'>Return to Home Page</Button>
        </>

    //Conditionally rendering the Form depending on the first to steps
    const Form = () => (
        activeStep === 0
            ? <AddressForm checkoutToken={checkoutToken} next={next} nextStep={nextStep}/>
            : <PaymentForm 
            refreshCart={refreshCart} error={error} order={order} nextStep={nextStep} checkoutToken={checkoutToken} 
            shippingData={shippingData} backStep={backStep} onCaptureCheckout={onCaptureCheckout}
              />
    );

    return (
        <>
            <main className={classes.layout} >
                <Typography variant='h4' align='center' >Checkout</Typography>
                {/* Maps through steps array and displays at top of page which step the user is on */}
                <Stepper activeStep={0} className={classes.stepper}>
                    {steps.map(step => (
                        <Step key={step} >
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    )
                    )}
                </Stepper>
                {/* Conditional rendering: If last step, displays Confirmation,
                 if not displays Form which in turn conditionally renders depending on initial steps*/}
                {activeStep === steps.length ? <ConfirmationForm/> : checkoutToken && <Form/>}
            </main>
        </>
    )
}

export default Checkout;
