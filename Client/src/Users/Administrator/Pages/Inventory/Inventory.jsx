import React, {useState, useEffect} from "react";
import {Card, Row} from "react-bootstrap";
import {Tabs, Tab, Alert} from "react-bootstrap";
import {useSessionContext} from "../../../../hooks/useSessionContext";
import StorageComponent from "./Storage/StorageComponent";
import RequestsComponent from "./Requests/RequestsComponent";
import SupplyComponent from "./Supply/SupplyComponent";
const Inventory = () => {
  const [key, setKey] = useState("");
  const {sessionData} = useSessionContext();

  useEffect(() => {
    setKey("Storage");
  }, [sessionData]);

  return (
    <Card>
      <Card.Body>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 d-flex justify-content-start"
        >
          <Tab eventKey="Storage" title="Storage">
            <StorageComponent />
          </Tab>
          <Tab eventKey="Requests" title="Requests">
            <RequestsComponent />
          </Tab>
          <Tab eventKey="Supplies" title="Supplies">
            <SupplyComponent />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default Inventory;
