import React from "react";
import Dashboard from "../Users/QualityEngineer/Pages/Dashboard/Dashboard";
import Inventory from "../Users/QualityEngineer/Pages/Inventory/Inventory";
// import Messages from "../Users/QualityEngineer/Pages/Messages/Messages";
import Messenger from "../Pages/Messages/Messenger";
import Account from "../Users/Administrator/Pages/Accounts/Account";

const qeRoutes = [
  {
    path: "/qe/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/qe/inventory",
    element: <Inventory />,
  },
  {
    path: "/qe/messenger",
    element: <Messenger />,
  },
  {
    path: "/account",
    element: <Account />,
  },
];

export default qeRoutes;
