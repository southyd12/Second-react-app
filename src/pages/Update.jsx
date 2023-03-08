import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import CartoonForm from '../components/forms/CartoonForm';
import { CartoonsContext } from '../components/contexts/cartoon.context';

function Update() {
  const {id} = useParams();
  const {cartoons, updateCartoon} = useContext(CartoonsContext);

  const cartoon = cartoons.find(({_id}) => id === _id);

  return (
    <>
      <Typography
         variant="h2"
         component="h1"
         sx={{marginBottom: 2}}       
        >
        Update Cartoon              
      </Typography>
      <CartoonForm cartoon={cartoon} submitHandler={updateCartoon} />
    </>
  )
}

export default Update