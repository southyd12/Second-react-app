import React from 'react'
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import CartoonForm from '../components/forms/CartoonForm';

function Update() {
  const {id} = useParams();
  return (
    <>
      <Typography
         variant="h2"
         component="h1"      
        >
        Update Cartoon              
      </Typography>
      <CartoonForm submitHandler={submitHandler} />
    </>
  )
}

export default Update