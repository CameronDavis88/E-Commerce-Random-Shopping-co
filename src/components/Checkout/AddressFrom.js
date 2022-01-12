import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../library/commerce';
import CustomInput from './CustomInput';

const AddressFrom = ({ checkoutToken }) => {

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();
    //shippingCountries comes back as an object this turns it into and array of objects each with an id and label key which is the name of country
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    console.log(countries)

    const fetchShippingCountries = async function (checkoutTokenId) {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries[0]));

    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, []);



    return (
        //Employing React hook form for all the inputs
        <>
            <Typography variant='h6' gutterBottom >Shipping Address</Typography>
            <FormProvider {...methods} >
                <form onSubmit='' >
                    <Grid container spacing={3} >
                        {/* CustomInput is a reusable input component I created using react-hook-form */}
                        <CustomInput required name='first name' label='First name' />
                        <CustomInput required name='last name' label='Last name' />
                        <CustomInput required name='address1' label='Address' />
                        <CustomInput required name='email' label='Email' />
                        <CustomInput required name='city' label='City' />
                        <CustomInput required name='zip' label='ZIP code' />

                        <Grid type item xs={12} sm={6} >
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fillWidth onChange={(e) => setShippingCountry(e.target.value)} >
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>

                        {/* <Grid type item xs={12} sm={6} >
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={} fillWidth onChange={} >
                                <MenuItem key={} value={}>
                                    Select me
                                </MenuItem>
                            </Select>
                        </Grid>

                        <Grid type item xs={12} sm={6} >
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={} fillWidth onChange={} >
                                <MenuItem key={} value={}>
                                    Select me
                                </MenuItem>
                            </Select>
                        </Grid> */}


                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressFrom;
