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

    //shippingCountries comes back as an object this turns it into and array of objects each with an id and label key which is the name of country
    const countriesArr = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    const subdivisionsArr = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
    //shippingOptions is already an array --this is making the field display the type of option and the price by its id
    const optionsArr = shippingOptions.map((shippingObj) => ({ id: shippingObj.id, label: `${shippingObj.description} - (${shippingObj.price.formatted_with_symbol})` }))

    const fetchShippingCountries = async function (checkoutTokenId) {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async function (countryCode) {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async function (checkoutTokenId, country, region = null) {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    const onSubmit = (data) => {
        methods.handleSubmit(next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))
    }

    const onError = (error) => console.log(error);

    return (
        //Employing React hook form for all the inputs
        <>
            <Typography variant='h6' gutterBottom >Shipping Address</Typography>
            <FormProvider {...methods} nextStep={nextStep} >
                {/* sending an object with the data spread from the input fields with that of the select fields and sending them through the next function from props to state in checkout */}
                <form onSubmit={handleSubmit((data) => onSubmit({ ...data, shippingCountry, shippingSubdivision, shippingOption }), onError)}>
                    <Grid container spacing={3} >
                        <TextField required style={{ margin: 15 }} name='firstName' label='First name'{...register('firstName')} defaultValue={''}/>
                        <TextField required style={{ margin: 15 }} name='lastName' label='Last name'{...register('lastName')} defaultValue={''}/>
                        <TextField required style={{ margin: 15 }} name='email' label='email'{...register('email')} />
                        <TextField required style={{ margin: 15 }} name='address1' label='Address'{...register('address1')} defaultValue={''}/>
                        <TextField required style={{ margin: 15 }} name='city' label='City'{...register('city')} defaultValue={''}/>
                        <TextField required style={{ margin: 15 }} name='zip' label='ZIP code'{...register('zip')} defaultValue={''}/>
                        <Grid type item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countriesArr.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid type item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisionsArr.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label} </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid type item xs={12} sm={6}>
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
