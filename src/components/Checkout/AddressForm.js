import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography, TextField } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { commerce } from '../../library/commerce';

const AddressForm = ({ checkoutToken, next, nextStep }) => {
    //Destructuring methods from react-hook-form
    const { register, handleSubmit } = useForm();
    //React hooks
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();

    //Turns these objects into arrays of objects with id and label and assigning the vale to the respective variables
    const countriesArr = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    const subdivisionsArr = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
    //shippingOptions is already an array --this is making the field display the type of option and the price by its id
    const optionsArr = shippingOptions.map((shippingObj) => ({ id: shippingObj.id, label: `${shippingObj.description} - (${shippingObj.price.formatted_with_symbol})` }))

    //Fetching from Commerce.js the countries available for shipping and sets the countries hook to its value
    const fetchShippingCountries = async function (checkoutTokenId) {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        //Sets the shippingCountry to be the first in the array created from the object of countries
        setShippingCountry(Object.keys(countries)[0]);
    }

    //Fetching from Commerce.js the shipping subdivisions from the selected country sets the subdivisions hook to its value
    const fetchSubdivisions = async function (countryCode) {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        //Sets the shippingSubdivision hook to be the first in the array created from the object of subdivisions
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    //Fetching from Commerce.js the shipping options from the selected subdivision sets the subdivisions hook to its value
    const fetchShippingOptions = async function (checkoutTokenId, country, region = null) {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
        setShippingOptions(options);
        //Sets the shippingOption to be the first in the array of options
        setShippingOption(options[0].id);
    }

   //Fetching the shipping countries upon mounting the component 
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, []);

    // When a shipping country is selected the page is re-rendered and fetches the shipping subdivisions of that country
    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry]);

    // When a shipping subdivision is selected the page is re-rendered and fetches the shipping options of that subdivision
    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    //Handles the submitting of the data from the inputs and selection fields in the Form below passing it as an argument in next method passed from props
    const onSubmit = (data) => {
        methods.handleSubmit(next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))
    }

    const onError = (error) => console.log(error);

    return (
        //Employing react-hook-form for all the inputs and select fields and sending an object with the data spread 
        //therefrom and passing it through the "next" function from props to shippingData hook in Checkout component
        <>
            <Typography variant='h6' gutterBottom >Shipping Address</Typography>
            <FormProvider {...methods} nextStep={nextStep}>
                <form onSubmit={handleSubmit((data) => onSubmit({ ...data, shippingCountry, shippingSubdivision, shippingOption }), onError)}>
                    <Grid container spacing={3} >
                        <TextField required style={{ margin: 15 }} name='firstName' label='First name'{...register('firstName')} defaultValue={''}/>
                        <TextField required style={{ margin: 15 }} name='lastName' label='Last name'{...register('lastName')} defaultValue={''}/>
                        <TextField required style={{ margin: 15 }} name='email' label='email'{...register('email')} />
                        <TextField required style={{ margin: 15 }} name='address1' label='Address'{...register('address1')} defaultValue={''}/>
                        <TextField required style={{ margin: 15 }} name='city' label='City'{...register('city')} defaultValue={''}/>
                        <TextField required style={{ margin: 15 }} name='zip' label='ZIP code'{...register('zip')} defaultValue={''}/>
                        <Grid type item xs={12} sm={6}>
                            {/* Displaying all of the countries available for shipping in select field */}
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countriesArr.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid type item xs={12} sm={6}>
                            {/* Displaying all of the subdivision available for shipping in select field */}
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisionsArr.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label} </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid type item xs={12} sm={6}>
                            {/* Displaying the shipping options available for shipping in select field */}
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {optionsArr.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br /><br/>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant='outlined'>Back to Cart</Button>
                        <Button type="submit" variant='contained' color='primary'>Next Step</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm;
