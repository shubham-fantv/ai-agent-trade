import React, { createContext, useState, useContext, useCallback } from "react";

const SnackbarContext = createContext();

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    show: false,
    status: "",
    message: "",
  });

  const openSnackbar = useCallback((status, message) => {
    setSnackbar({
      show: true,
      status: status,
      message: message,
    });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbar({ ...snackbar, show: false });
  }, [snackbar]);

  return (
    <SnackbarContext.Provider value={{ snackbar, openSnackbar, closeSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
