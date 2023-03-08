import React from 'react'
import Typography from '@mui/material/Typography';
import CartoonForm from '../components/forms/CartoonForm';

function Add() {
  return (
    <>
      <Typography
         variant="h2"
         component="h1"      
        >
        Add Car              
      </Typography>
      <CartoonForm submitHandler={submitHandler} />
    </>
  );
}

export default Add