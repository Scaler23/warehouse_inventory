import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {AuthProvider} from "./context/AuthContext.jsx";
import {SessionProvider} from "./context/SessionContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SessionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SessionProvider>
  </AuthProvider>
);
