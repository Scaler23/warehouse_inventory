import React from "react";
// import Dashboard from "../Users/WarehouseAssociate/Pages/Dashboard/Dashboard";
import Inventory from "../Users/WarehouseAssociate/Pages/Inventory/Inventory";
// import Messages from "../Users/WarehouseAssociate/Pages/Messages/Messages";
import Messenger from "../Pages/Messages/Messenger";
import Account from "../Users/Administrator/Pages/Accounts/Account";

const waRoutes = [
  {
    path: "/wa/inventory",
    element: <Inventory />,
  },
  {
    path: "/wa/messenger",
    element: <Messenger />,
  },
  {
    path: "/wa/account",
    element: <Account />,
  },
];

export default waRoutes;
