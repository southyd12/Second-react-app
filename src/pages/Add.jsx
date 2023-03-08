import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CartoonForm from '../components/forms/CartoonForm';
import { CartoonsContext } from '../components/contexts/cartoon.context';

function Add() {
  const {addCartoon} = useContext(CartoonsContext)
  const navigate = useNavigate();

  const submitHandler = (data) => {
    addCartoon(data);
    navigate('/');
  }

  return (
    <>
      <Typography
         variant="h2"
         component="h1"      
        >
        Add Cartoon              
      </Typography>
      <CartoonForm submitHandler={submitHandler} />
    </>
  );
}

export default Add