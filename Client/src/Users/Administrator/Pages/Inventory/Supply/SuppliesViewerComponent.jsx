import React, {useState, useEffect} from "react";
import {Alert, Card, Row, Col, Button} from "react-bootstrap";
import useStorage from "../../../../../hooks/api/useStorage";
import {completed} from "../../../../../api/supply";
const SuppliesViewerComponent = ({isSetManageSupply, setSupplyData}) => {
  const {storageData} = useStorage();
  const [units, setUnits] = useState([]);
  useEffect(() => {
    calculateCapacity();
  }, []);
  const calculateCapacity = async () => {
    try {
      const data = await completed();
      console.log(`completed data`, data);
      setUnits(data);
    } catch (error) {
      console.error(`cannot fetch data`, error);
    }
  };

  const supplyCapacityData = (value) => {
    setSupplyData(value);
    isSetManageSupply(true);
  };

  return (
    <Row>
      {storageData ? (
        storageData.map((storage) => (
          <Col lg={3} key={storage.name}>
            <Card style={{minHeight: "300px"}}>
              <Card.Header>
                {" "}
                <h5 className="m-0">{storage.name}</h5>{" "}
              </Card.Header>
              <Card.Body style={{fontSize: "14px"}}>
                {storage.location}
                <hr />
                {storage.description}
              </Card.Body>
              <Card.Footer style={{fontSize: "14px"}}>
                <span className="text-muted">Maximum Capacity:</span>{" "}
                {storage.capacity} units
              </Card.Footer>
              {units.length > 0 ? (
                units.map((unit) => (
                  <>
                    {unit.name === storage.name && (
                      <>
                        <Card.Footer key={unit.name}>
                          Free Space:
                          <div
                            style={{
                              color:
                                unit.capacity - unit.total_quantity >=
                                storage.capacity * 0.2
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {unit.capacity - unit.total_quantity} units
                          </div>
                        </Card.Footer>
                        <Card.Footer>
                          <Button
                            variant="success"
                            onClick={() =>
                              supplyCapacityData({
                                storage_name: unit.name,
                                storage_capacity: unit.capacity,
                                storage_used: unit.total_quantity,
                              })
                            }
                          >
                            Manage
                          </Button>
                        </Card.Footer>
                      </>
                    )}
                  </>
                ))
              ) : (
                <div style={{color: "green"}}>{storage.capacity} units</div>
              )}
            </Card>
          </Col>
        ))
      ) : (
        <div>No Storage</div>
      )}
    </Row>
  );
};

export default SuppliesViewerComponent;
