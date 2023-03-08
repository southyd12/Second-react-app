import React, { createContext, useState, useCallback, useContext } from "react";
import { CARTOONS_ENDPOINT, STORAGE_KEY } from "../../settings";

export const CartoonsContext = createContext({
  fetchCartoons: () => [],
  addCartoon: () => {},
  updateCartoon: () => {},
  deleteCartoon: () => {},
  loaded: false,
  loading: false,
  error: null,
  cartoons: [],
});

export const CartoonsProvider = ({children}) => {
  const [cartoons, setCartoons] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const fetchCartoons = useCallback(async () => {
    if (loading || loaded || error) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(CARTOONS_ENDPOINT);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setCartoons(data);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  }, [error, loaded, loading]);

  const addCartoon = useCallback(async (formData) => {
    console.log("about to add", formData);
    try {
      const response = await fetch(CARTOONS_ENDPOINT, {
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
      const savedCartoon = await response.json();
      console.log("got data", savedCartoon);
      const newCartoons = [...cartoons, savedCartoon];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCartoons));
      setCartoons(newCartoons);
    } catch (err) {
      console.log(err);
      showMessage({type: 'error', string: "Error loading cartoons"})
    }
  }, [cartoons]);

  const updateCartoon = useCallback(async (id, formData) => {
    console.log("updating", id, formData);
    let updatedCartoon = null;

    const index = cartoons.findIndex((cartoon) => cartoon._id === id);
    console.log(index);
    if (index === -1) throw new Error(`Cartoon with index ${id} not found`);

    const oldCartoon = cartoons[index];
    console.log("oldCartoon", oldCartoon);

    const updates = {};

    for (const key of Object.keys(oldCartoon)) {
      if (key === "_id") continue;
      if (oldCartoon[key] !== formData[key]) {
        updates[key] = formData[key];
      }
    }

    try {
      const response = await fetch(`${CARTOONS_ENDPOINT}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.status !== 200) {
        throw response;
      }

      updatedCartoon = {
        ...oldCartoon,
        ...formData,
      };
      console.log("updatedCartoon", updatedCartoon);

      const updatedCartoons = [
        ...cartoons.slice(0, index),
        updatedCartoon,
        ...cartoons.slice(index + 1),
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCartoons));

      setCartoons(updatedCartoons);
    } catch (err) {
      console.log(err);
    }
  }, [cartoons]);

  const deleteCartoon = useCallback(async (id) => {
    let deletedCartoon = null;
    try {
      const response = await fetch(`${CARTOONS_ENDPOINT}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 204) {
        throw response;
      }

      const index = cartoons.findIndex((cartoon) => cartoon._id === id);
      deletedCartoon = cartoons[index];

      const updatedCartoons = [...cartoons.slice(0, index), ...cartoons.slice(index + 1)];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCartoons));
      setCartoons(updatedCartoons);
      console.log(`Deleted ${deletedCartoon.title}`);

    } catch (err) {
      console.log(err);
    }
  }, [cartoons]);

  return (
    <CartoonsContext.Provider
      value={{
        cartoons,
        loading,
        error,
        fetchCartoons,
        addCartoon,
        updateCartoon,
        deleteCartoon,
      }}
    >
      {children}
    </CartoonsContext.Provider>
  );
};