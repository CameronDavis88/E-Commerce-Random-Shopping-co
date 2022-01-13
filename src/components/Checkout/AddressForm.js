import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../library/commerce';
import CustomInput from './CustomInput';
import { Link } from 'react-router-dom';







const AddressForm = ({ checkoutToken, next, nextStep }) => {

   

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const {handleSubmit} = useForm();
    const  methods = useForm();


    //shippingCountries comes back as an object this turns it into and array of objects each with an id and label key which is the name of country
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
    //shippingOptions is already an array --this is making the field display the type of option and the price by its id
    const options = shippingOptions.map((shippingObj) => ({ id: shippingObj.id, label: `${shippingObj.description} - (${shippingObj.price.formatted_with_symbol})`}))

    // console.log(subdivisions)
    // console.log(shippingOptions)
    // console.log(countries[0])
    // console.log(shippingOption)
    const fetchShippingCountries = async function (checkoutTokenId) {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        // console.log(countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries[0]));
        // console.log(countries[0]);
    }

    const fetchSubdivisions = async function(countryCode){
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions[0]));
        console.log(Object.keys(subdivisions[0]))
    }

    const fetchShippingOptions = async function(checkoutTokenId, country, region = null){
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
        console.log()
    }, []);

    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry]);

    useEffect(() => {
        // console.log(options)
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    // const onSubmit = ( data) => {
    //     // e.preventDefault();
    //     next(data);
    // }

    const submitForm = (data) => {
        next(data)
    }
    
    return (
        //Employing React hook form for all the inputs
        <>
            <Typography variant='h6' gutterBottom >Shipping Address</Typography>
            <FormProvider {...methods} nextStep={nextStep} >
                {/* sending an object with the data spread from the input fields with that of the select fields and sending them through the next function from props to state in checkout */}
                <form 
                // onSubmit={handleSubmit((data)=>onSubmit(data))}
                //  onSubmit={ handleSubmit( (data) =>  next({ ...data, shippingCountry, shippingSubdivision, shippingOption })) }
                // onSubmit={ handleSubmit( (data) => onSubmit({ ...data, shippingCountry, shippingSubdivision, shippingOption })) }
                onSubmit={ methods.handleSubmit( (data) => submitForm({ ...data, shippingCountry, shippingSubdivision, shippingOption })) }

                  >
                    <Grid container spacing={3} >
                        {/* CustomInput is a reusable input component I created using react-hook-form */}
                        <CustomInput  name='first name' label='First name' />
                        <CustomInput name='last name' label='Last name' />
                        <CustomInput name='address1' label='Address' />
                        <CustomInput name='email' label='Email' />
                        <CustomInput name='city' label='City' />
                        <CustomInput name='zip' label='ZIP code' />

                      

                        <Grid type item xs={12} sm={6} >
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)} >
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                                ))}

                            </Select>
                        </Grid>
                        <Grid type item xs={12} sm={6} >
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)} >
                            {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label} </MenuItem>
                                ))}
                                
                            </Select>
                        </Grid>
                        <Grid type item xs={12} sm={6} >
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)} >
                            {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                                ))}
                                
                            </Select>
                        </Grid>
                    </Grid>
                </form>
                   <br/>
                     <div style={{display: 'flex', justifyContent:'space-between'}} >
                         <Button component={Link} to="/cart" variant='outlined'>Back to Cart</Button>
                         <Button 
                        //  onClick={onSubmit}
                        // onClick={() => nextStep()}
                        onClick={() => submitForm()}

                          type="submit" variant='contained' color='primary'>Next Step</Button>
                         </div>           
            </FormProvider>
        </>
    )
}

export default AddressForm;
