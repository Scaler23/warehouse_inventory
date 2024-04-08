import "./App.css";
import React, {useEffect, useState} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import LandingPage from "./Users/Administrator/Pages/LandingPage/LandingPage";
import Login from "./Pages/LoginPage/Login";
import AdminLayoutPage from "./Users/Administrator/layout/LayoutPage";
import QELayoutPage from "./Users/QualityEngineer/layout/LayoutPage";
import WALayoutPage from "./Users/WarehouseAssociate/layout/LayoutPage";
import Notfound from "./Users/Administrator/Pages/NotFound";
import adminRoutes from "./routes/AdminRoutes";
import qeRoutes from "./routes/QualityEngineerRoutes";
import waRoutes from "./routes/WarehouseAssociateRoutes";
import dsRoutes from "./routes/DummySupplier";
import {useAuthContext} from "./hooks/useAuthContext";

const App = () => {
  const {isLoggedIn} = useAuthContext();

  return (
    <>
      <Routes>
        <Route element={<AdminLayoutPage />}>
          {adminRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={isLoggedIn ? route.element : <Navigate to="/login" />}
            />
          ))}
        </Route>
        <Route element={<QELayoutPage />}>
          {qeRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={isLoggedIn ? route.element : <Navigate to="/login" />}
            />
          ))}
        </Route>
        <Route element={<WALayoutPage />}>
          {waRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={isLoggedIn ? route.element : <Navigate to="/login" />}
            />
          ))}
        </Route>
        <Route>
          {dsRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={isLoggedIn ? route.element : <Navigate to="/login" />}
            />
          ))}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;
