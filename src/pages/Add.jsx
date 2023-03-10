import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import DriverForm from '../components/forms/DriverForm';
import { DriversContext } from '../components/contexts/driver.context';

function Add() {
  const { addDriver } = useContext(DriversContext);
  const navigate = useNavigate();

  const submitHandler = (data) => {
    addDriver(data);
    navigate('/');
  };

  return (
    <>
      <Typography variant="h2" component="h1">
        Add Driver
      </Typography>
      <DriverForm submitHandler={submitHandler} />
    </>
  );
}

export default Add;
