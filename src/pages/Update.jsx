import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import DriverForm from '../components/forms/DriverForm';
import { DriversContext } from '../components/contexts/driver.context';

function Update() {
  const { id } = useParams();
  const { drivers, updateDriver } = useContext(DriversContext);

  const driver = drivers.find(({ _id }) => id === _id);

  return (
    <>
      <Typography variant="h2" component="h1" sx={{ marginBottom: 2 }}>
        Update Driver
      </Typography>
      <DriverForm driver={driver} submitHandler={updateDriver} />
    </>
  );
}

export default Update;
