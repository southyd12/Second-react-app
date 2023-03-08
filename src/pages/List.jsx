import React, {useContext, useEffect} from 'react'
import {Button} from '@mui/material';
import { Typography } from '@mui/material';

import { CartoonsContext } from '../components/contexts/cartoon.context';

function CartoonListPage() {
  const {cartoons, fetchCartoons, deleteCartoon} = useContext(CartoonsContext);

  useEffect(() => {
    fetchCartoons();
  }, [fetchCartoons]);
  
  return (
    <>
      <Typography variant="h3" component="h2">
        Cartoons
      </Typography>
      {/* <Button onClick={() => showMessage({type: 'warning', string: "This is a warning"})}>Show Message</Button> */}
      {/* <CarsList cars={cars} deleteHandler={deleteHandler} /> */}
    </>
  )
}

export default CartoonListPage