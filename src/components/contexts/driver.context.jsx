import React, { createContext, useState, useCallback } from "react";
import { DRIVERS_ENDPOINT, STORAGE_KEY } from "../../settings";

export const DriversContext = createContext({
  fetchDrivers: () => [],
  addDriver: () => {},
  updateDriver: () => {},
  deleteDriver: () => {},
  loaded: false,
  loading: false,
  error: null,
  drivers: [],
});

export const DriversProvider = ({children}) => {
  const [drivers, setDrivers] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const fetchDrivers = useCallback(async () => {
    if (loading || loaded || error) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(DRIVERS_ENDPOINT);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setDrivers(data);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  }, [error, loaded, loading]);

  const addDriver = useCallback(async (formData) => {
    console.log("about to add", formData);
    try {
      const response = await fetch(DRIVERS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(formData),
      });
      if (response.status !== 201) {
        throw response;
      }
      const savedDriver = await response.json();
      console.log("got data", savedDriver);
      const newDrivers = [...drivers, savedDriver];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newDrivers));
      setDrivers(newDrivers);
    } catch (err) {
      console.log(err);
    }
  }, [drivers]);

  const updateDriver = useCallback(async (id, formData) => {
    console.log("updating", id, formData);
    let updatedDriver = null;

    const index = drivers.findIndex((driver) => driver._id === id);
    console.log(index);
    if (index === -1) throw new Error(`Driver with index ${id} not found`);

    const oldDriver = drivers[index];
    console.log("oldDriver", oldDriver);

    const updates = {};

    for (const key of Object.keys(oldDriver)) {
      if (key === "_id") continue;
      if (oldDriver[key] !== formData[key]) {
        updates[key] = formData[key];
      }
    }

    try {
      const response = await fetch(`${DRIVERS_ENDPOINT}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.status !== 200) {
        throw response;
      }

      updatedDriver = {
        ...oldDriver,
        ...formData,
      };
      console.log("updatedDriver", updatedDriver);

      const updatedDrivers = [
        ...drivers.slice(0, index),
        updatedDriver,
        ...drivers.slice(index + 1),
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDrivers));

      setDrivers(updatedDrivers);
    } catch (err) {
      console.log(err);
    }
  }, [drivers]);

  const deleteDriver = useCallback(async (id) => {
    let deletedDriver = null;
    try {
      const response = await fetch(`${DRIVERS_ENDPOINT}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 204) {
        throw response;
      }

      const index = drivers.findIndex((driver) => driver._id === id);
      deletedDriver = drivers[index];

      const updatedDrivers = [...drivers.slice(0, index), ...drivers.slice(index + 1)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDrivers));
      setDrivers(updatedDrivers);
      console.log(`Deleted ${deletedDriver.firstname} ${deletedDriver.lastname}`);

    } catch (err) {
      console.log(err);
    }
  }, [drivers]);

  return (
    <DriversContext.Provider
      value={{
        drivers,
        loading,
        error,
        fetchDrivers,
        addDriver,
        updateDriver,
        deleteDriver,
      }}
    >
      {children}
    </DriversContext.Provider>
  );
};