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
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 d-flex justify-content-start"
          >
            <Tab
              eventKey="Overview"
              title={
                <span className="d-flex align-items-center">
                  Overview <i className="bx bx-bar-chart-alt-2"></i>
                </span>
              }
            >
              <Alert variant="success">
                <Alert.Heading>Welcome to Rating Management!</Alert.Heading>
                <p>
                  Each rating within the Built-In Quality Indication system
                  corresponds to specific criteria or standards that define the
                  quality level. For example, a product or service rated as
                  "poor" may exhibit significant defects or deficiencies, while
                  one rated as "excellent" meets or exceeds all quality
                  standards with exceptional performance and reliability.
                </p>
              </Alert>
              <OverviewComponent />
            </Tab>
            <Tab eventKey="Requests" title="Requests">
              <RequestsComponent />
            </Tab>
            <Tab eventKey="Supplies" title="Supplies">
              <SupplyComponent />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Inventory;
