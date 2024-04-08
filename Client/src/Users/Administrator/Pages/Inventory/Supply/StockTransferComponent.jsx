import React, {useEffect, useState} from "react";
import FormikControl from "../../../../../components/Formik/FormikControl";
import {Form, Formik} from "formik";
import {Row, Col} from "react-bootstrap";
import {getStorages} from "../../../../../api/storage";
const StockTransferComponent = ({maxValue}) => {
  const [storages, setStorages] = useState([]);
  useEffect(() => {
    getStorageFunction();
  }, []);

  const getStorageFunction = async () => {
    try {
      const data = await getStorages();
      setStorages(data);
      storages && console.log(storages);
    } catch (error) {}
  };
  return (
    <Formik>
      {(formik) => (
        <Form>
          <Row>
            <Col lg={4}>
              <FormikControl
                control="input"
                type="number"
                name="units"
                onChange={formik.handleChange}
                label="How many units ?"
                defaultValue={maxValue}
                max={maxValue}
              />
            </Col>
            <Col lg={4}>
              <FormikControl
                control="select"
                label="Urgency Level"
                name="urgency"
                onChange={formik.handleChange}
                defaultValue=""
                options={[
                  {
                    key: "Critical",
                    value: "critical",
                    display: "Critical",
                    color: "red",
                  },
                  {
                    key: "High",
                    value: "high",
                    display: "High",
                    color: "orange",
                  },
                  {
                    key: "Medium",
                    value: "medium",
                    display: "Medium",
                    color: "yellow",
                  },
                  {key: "Low", value: "low", display: "Low", color: "green"},
                ]}
              />
            </Col>
            <Col lg={4}>
              <FormikControl
                control="select"
                label="Transfer to:"
                name="location"
                onChange={formik.handleChange}
                defaultValue=""
                options={storages.map((storage) => ({
                  key: storage.name,
                  value: storage.id,
                  display: storage.name,
                }))}
              />
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default StockTransferComponent;
