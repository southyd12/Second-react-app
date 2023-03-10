import React, { useContext, useEffect } from 'react';
import { Typography } from '@mui/material';

import { DriversContext } from '../components/contexts/driver.context';

import DriverList from '../components/DriverList';

function DriverListPage() {
  const { drivers, fetchDrivers, deleteDriver } =
    useContext(DriversContext);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const deleteHandler = (id) => {
    deleteDriver(id);
  };

  return (
    <>
      <Typography variant="h3" component="h2">
        Drivers
      </Typography>
      <DriverList drivers={drivers} deleteHandler={deleteHandler} />
    </>
  );
}

export default DriverListPage;
