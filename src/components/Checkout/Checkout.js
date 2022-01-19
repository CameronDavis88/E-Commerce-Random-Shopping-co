import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, Divider, Button, CssBaseline } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { commerce } from '../../library/commerce';
import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, error, onCaptureCheckout, order, refreshCart }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState('');
    const [shippingData, setShippingData] = useState({});

    useEffect(() => {
    }, []);

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

    const nextStep = () => {
        setActiveStep((previousActiveStep) => previousActiveStep + 1);
    }
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1);

    const next = function (data) {
        setShippingData(data);
        nextStep();
    }

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

    //conditionally rendering the form
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
            {/* <CssBaseline /> */}
            {/* <div className={classes.toolbar} /> */}
            <main className={classes.layout} >
                {/* <Paper className={classes.paper} /> */}
                <Typography variant='h4' align='center' >Checkout</Typography>
                <Stepper activeStep={0} className={classes.stepper}>
                    {steps.map(step => (
                        <Step key={step} >
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    )
                    )}
                </Stepper>
                {/* If it is in the last step display the Confirmation Form for review if not display From if token was returned*/}
                {activeStep === steps.length ? <ConfirmationForm/> : checkoutToken && <Form/>}
            </main>
        </>
    )
}

export default Checkout;
