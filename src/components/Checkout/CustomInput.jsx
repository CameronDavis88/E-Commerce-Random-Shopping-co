// import React, {useState} from 'react';
// import { TextField, Grid, Button } from '@material-ui/core';
// import { useFormContext, Controller, useForm } from 'react-hook-form';

// const CustomInput = ({ name, label, value, change, dude }) => {
//   const { control } = useFormContext();
//   const { register } = useForm();
//   const isError = false;
//   // const  {register, getValues } = useForm();

//   // const changeTest = (inputValue) => {
//   //   // handleChange(inputValue);
//   //   change(inputValue);

//   // }

//   // const [thing, setThing] = useState('hhhhhhhhhhhhhhhhhhhhhh');

//   // const changeaRoo = (v) => {
//   //   change(v)
//   // }

//   return (
//     <Grid item xs={12} sm={6} >
//       <Controller
// // as={TextField}


// control={control}
// name={name}


//       render={({field}) => {
//         return <TextField {...field}
//         type='text'
//         // control={control}
//         // required
//         // name={name}
//         fullWidth
//         label={label}
//         error={isError}
        
//         />
//       }}


        
//         // type='text'
//         // name={name}
//         // fullWidth
//         // label={label}
//         // error={isError}

//         // value={value}
//         // required


//         {...register({dude})}

//         // onChange={(e) => changeaRoo(e.target.value)}
        
//         // onChange={handleChange}
//         // onChange={e => handleChange(e.target.value)}

//         // handleChange={(e) => {
//         //   const inputValue = e.target.value;
//         //   changeTest(inputValue);
//         // }
//         // }



//         // onChange={e => setThing(e.target.value)}
//         // handleChange={(e) => setThing(e.target.value)}


//       />
//       {/* <Button onClick={() => console.log(thing)} variant='contained'>Testing the thing</Button> */}

//       {/* <Button type='button' onClick={() => {
//                               const bigTestThing = getValues()
//                               console.log(bigTestThing)
//                           }} 
//                           variant='contained' >Button Test for register</Button> */}

// {/* <Button  type='submit' variant='contained'>Test button blah blah</Button> */}

//     </Grid>
//   )
// }

// export default CustomInput;
