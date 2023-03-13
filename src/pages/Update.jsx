import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import DriverForm from '../components/forms/DriverForm';
import { DriversContext } from '../components/contexts/driver.context';

function Update() {
  const { id } = useParams();
  const { drivers, updateDriver } = useContext(DriversContext);
  const navigate = useNavigate();

  const driver = drivers.find(({ _id }) => id === _id);

  const updateHandler = (data) => {
    updateDriver(id, data);
    navigate('/');
  };

  return (
    <>
      <Typography variant="h2" component="h1" sx={{display:'flex', justifyContent: 'center', mb: 2}}>
        Update Driver
      </Typography>
      <DriverForm driver={driver} submitHandler={updateHandler} />
    </>
  );
}

export default Update;
