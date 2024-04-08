import React, {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {Row, Col, ProgressBar, Container} from "react-bootstrap";
import FormikControl from "../../../../../components/Formik/FormikControl";
import {Form, Formik} from "formik";
import StockTransferComponent from "./StockTransferComponent";
import StockDeliveryComponent from "./StockDeliveryComponent";
const SupplyManageComponent = ({isSetManageSupply, supplyData}) => {
  const [percentage, setPercentage] = useState();
  const [command, setCommand] = useState(null);
  useEffect(() => {
    setPercentage(
      (supplyData.storage_used / supplyData.storage_capacity) * 100
    );
  }, [supplyData]);
  const handleSupplyCommand = (value) => {
    if (value === "Stock Transfer") {
      setCommand(<StockTransferComponent maxValue={supplyData.storage_used} />);
    } else if (value === "For Delivery") {
      setCommand(<StockDeliveryComponent />);
    }
  };
  return (
    <div>
      <motion.i
        whileHover={{scale: 2}}
        whileTap={{scale: 0.9}}
        class="bx bx-left-arrow-alt"
        style={{cursor: "pointer"}}
        onClick={() => isSetManageSupply(false)}
      ></motion.i>{" "}
      <h5 className="p-3">Manage Supply</h5>
      <Container>
        <Row>
          <Col lg={12} className="pb-4">
            <Col className="d-flex justify-content-end">
              {supplyData.storage_capacity} units
            </Col>
            <ProgressBar now={percentage} />
          </Col>
        </Row>
        <Row>
          <Col lg={4} className="d-flex">
            <Col className="d-flex flex-column text-end">
              <span className="text-muted" style={{marginRight: "20px"}}>
                Storage Name:
              </span>
              {/* <span className="text-muted" style={{marginRight: "20px"}}>
              Maximum Capacity:
            </span> */}
              <span className="text-muted" style={{marginRight: "20px"}}>
                Units:
              </span>
            </Col>
            <Col className="d-flex flex-column">
              <div>{supplyData.storage_name}</div>
              {/* <div>{supplyData.storage_capacity}</div> */}
              <div>{supplyData.storage_used}</div>
            </Col>
          </Col>
        </Row>
        <h5 className="py-4">Commands</h5>
        <Row>
          <Col lg={12}>
            <Formik
              initialValues={{command_name: ""}}
              onSubmit={handleSupplyCommand}
            >
              {(formik) => (
                <Form>
                  <Row>
                    <Col sm={12} md={4} className="mb-3">
                      <FormikControl
                        control="select"
                        defaultValue=""
                        label=""
                        name="command_name"
                        onChange={(e) => {
                          formik.handleChange(e);
                          handleSupplyCommand(e.target.value);
                        }}
                        options={[
                          {
                            key: "Stock Transfer",
                            display: "Stock Transfer",
                            value: "Stock Transfer",
                          },
                          {
                            key: "For Delivery",
                            display: "For Delivery",
                            value: "For Delivery",
                          },
                        ]}
                      />
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
        {command}
      </Container>
    </div>
  );
};

export default SupplyManageComponent;
