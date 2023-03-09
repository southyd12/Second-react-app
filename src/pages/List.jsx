import React, {useContext, useEffect} from 'react'
import { Typography } from '@mui/material';

import { CartoonsContext } from '../components/contexts/cartoon.context';

import CartoonList from '../components/CartoonList';

function CartoonListPage() {
  const {cartoons, fetchCartoons, deleteCartoon} = useContext(CartoonsContext);

  useEffect(() => {
    fetchCartoons();
  }, [fetchCartoons]);

  const deleteHandler = (i) => {
    deleteCartoon(i);
  };

  return (
    <>
      <Typography variant="h3" component="h2">
        Cartoons
      </Typography>
      <CartoonList cartoons={cartoons} deleteHandler={deleteHandler} />
    </>
  )
}

export default CartoonListPage