// AdminRoutes.js
import Dashboard from "../Users/Administrator/Pages/Dashboard";
import Inventory from "../Users/Administrator/Pages/Inventory/Inventory";
import Setting from "../Users/Administrator/Pages/Setting";
import Messenger from "../Pages/Messages/Messenger";
import Account from "../Users/Administrator/Pages/Accounts/Account";
import Update from "../Users/Administrator/Pages/UpdatePage/Update";

const adminRoutes = [
  {path: "/dashboard", element: <Dashboard />},
  {path: "/inventory", element: <Inventory />},
  {path: "/updates", element: <Update />},
  {path: "/messenger", element: <Messenger />},
  {path: "/account", element: <Account />},
  {path: "/setting", element: <Setting />},
];

export default adminRoutes;
