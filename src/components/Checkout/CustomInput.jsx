import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const CustomInput = ({ name, label }) => {
    const { control } = useFormContext();
    // const { register } = useForm();
  const isError = false;

    return (
        <Grid item xs={12} sm={6} >
             <Controller 
             as={TextField}
              control={control}
              required
              name={name}
              fullWidth
              label={label}
              error={isError}
            //   {...register(name)} 
              // render={({ field }) => {
              //   return <TextField {...field} fullWidth label={label} />;  
              // }} 

            //    render={({})=> ( <TextField fullWidth label={label} required /> )} 
               />
        </Grid>
    )
}

export default CustomInput;
