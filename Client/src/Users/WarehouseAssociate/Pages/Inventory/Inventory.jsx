import React, {useState, useEffect} from "react";
import {Row} from "react-bootstrap";
import {Tabs, Tab, Alert} from "react-bootstrap";
import {useSessionContext} from "../../../../hooks/useSessionContext";
import OverviewComponent from "./OverviewComponent";
import RequestsComponent from "./Requests/RequestsComponent";
import SupplyComponent from "./Supply/SupplyComponent";
const Inventory = () => {
  const [key, setKey] = useState("");
  const {sessionData} = useSessionContext();

  useEffect(() => {
    setKey("Overview");
  }, [sessionData]);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <SupplyComponent />
        </div>
      </div>
    </>
  );
};

export default Inventory;
