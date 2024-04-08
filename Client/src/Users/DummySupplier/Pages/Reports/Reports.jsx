import React, {useEffect, useState} from "react";
import {Card, Container} from "react-bootstrap";
import BSTableComponent from "../../../../components/BSTableComponent";
import {completed} from "../../../../api/quality";
import {columns} from "./tables/ReportsColumn";
const Reports = () => {
  const [SupplyRequests, setSupplyRequests] = useState([]);

  useEffect(() => {
    onloadGetSupplyRequests();
  }, []);

  const onloadGetSupplyRequests = async () => {
    try {
      const data = await completed();
      console.log(data);
      setSupplyRequests(data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  return (
    <Container>
      <Card>
        <Card.Header>Reports</Card.Header>
        <Card.Body>
          {SupplyRequests ? (
            <BSTableComponent
              BSKey="Summary"
              BSColumn={columns}
              BSData={SupplyRequests}
            />
          ) : (
            <>No data</>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Reports;
