import React from "react";
import {Route, Navigate} from "react-router-dom";
import {useAuthContext} from "./useAuthContext";

const PrivateRoute = ({element, ...props}) => {
  const {...authState} = useAuthContext();

  return (
    <Route
      {...props}
      element={
        authState.isLoggedIn ? element : <Navigate to="/login" replace />
      }
    />
  );
};

export default PrivateRoute;
