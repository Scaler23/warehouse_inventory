import React from "react";
import {Col, Row, Card, Button, Container} from "react-bootstrap";
import {Formik, Form} from "formik";
import FormikControl from "../../../../../../../components/Formik/FormikControl";
import {motion} from "framer-motion";
import initialValues from "../../../../../../../utils/initialValues.json";

const ReceiveComponent = ({setReceiving}) => {
  const qualityControlFormStructure = [
    {
      control: "select",
      label: "Rating",
      name: "rating",
      options: [
        {
          key: "Excellent",
          value: "Excellent",
          display: "Excellent",
        },
        {
          key: "Good",
          value: "Good",
          display: "Good",
        },
        {
          key: "Fair",
          value: "Fair",
          display: "Fair",
        },
        {
          key: "Poor",
          value: "Poor",
          display: "Poor",
        },
      ],
      md: 6,
    },
    {
      control: "input",
      type: "file",
      label: "Upload Documentation",
      name: "attachment",
      placeholder: "11/08/2019",
      md: 6,
    },

    {
      control: "checkbox",
      label: "Correct Quantity",
      name: "isCorrectQuantity",
      md: 4,
    },
    {
      control: "checkbox",
      label: "Proper Packaging",
      name: "isProperPackaging",
      md: 4,
    },
    {
      control: "checkbox",
      label: "Accurate Labels",
      name: "isAccurateLabels",
      md: 4,
    },
    {
      control: "checkbox",
      label: "No Damages",
      name: "isNoDamages",
      md: 4,
    },
    {
      control: "checkbox",
      label: "Satisfactory Condition",
      name: "isSatisfactoryCondition",
      md: 4,
    },
    {
      control: "checkbox",
      label: "Correct Color",
      name: "isCorrectColor",
      md: 4,
    },
    {
      control: "checkbox",
      label: "Functional Components",
      name: "isFunctionalComponents",
      md: 4,
    },
    {
      control: "checkbox",
      label: "Cleanliness",
      name: "isCleanliness",
      md: 4,
    },
    {
      control: "checkbox",
      label: "No Missing Parts",
      name: "isNoMissingParts",
      md: 4,
    },
    {
      control: "checkbox",
      label: "Accurate Documentation",
      name: "isAccurateDocumentation",
      md: 4,
    },
    {
      control: "textarea",
      label: "Summary Report",
      name: "reports_summary",
      rows: 3,
      placeholder: "Discuss Supplies",
      md: 12,
    },
  ];
  const handleQualityReport = async (values) => {
    console.log(values);
  };
  return (
    <motion.div initial={{opacity: 0, x: 50}} whileInView={{opacity: 1, x: 0}}>
      <Container>
        <div className="d-flex flex-row">
          <motion.i
            whileHover={{scale: 1.5}}
            whileTap={{scale: 0.6}}
            class="bx bxs-arrow-to-left"
            onClick={() => setReceiving(false)}
            style={{cursor: "pointer"}}
          ></motion.i>
          <h5 style={{marginLeft: "10px"}}>Quality Report</h5>
        </div>
        <Formik
          initialValues={initialValues.qualityControlFields}
          onSubmit={handleQualityReport}
        >
          {(formik) => (
            <Form>
              <Row className="py-4">
                {qualityControlFormStructure.map((structure) => {
                  return (
                    <Col
                      sm={12}
                      md={structure.md}
                      className="mb-3"
                      key={structure.name}
                    >
                      {structure.control === "input" ? (
                        <FormikControl
                          control={structure.control}
                          type={structure.type}
                          label={structure.label}
                          name={structure.name}
                          onChange={formik.handleChange}
                          defaultValue={structure.initialValue}
                          placeholder={structure.placeholder}
                        />
                      ) : structure.control === "checkbox" ? (
                        <div className="py-2">
                          <FormikControl
                            control={structure.control}
                            label={structure.label}
                            name={structure.name}
                            onChange={formik.handleChange}
                            checked={formik.values[structure.name]}
                          />
                        </div>
                      ) : structure.control === "textarea" ? (
                        <FormikControl
                          control={structure.control}
                          label={structure.label}
                          name={structure.name}
                          onChange={formik.handleChange}
                          defaultValue={structure.initialValue}
                          placeholder={structure.placeholder}
                        />
                      ) : (
                        <FormikControl
                          control={structure.control}
                          label={structure.label}
                          name={structure.name}
                          onChange={formik.handleChange}
                          options={structure.options}
                          defaultValue=""
                        />
                      )}
                    </Col>
                  );
                })}
                <Col sm={12} lg={12} className="d-flex flex-row-reverse p-4">
                  <motion.div
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.9}}
                  >
                    <Button variant="primary" className="p-2" type="submit">
                      Submit
                    </Button>
                  </motion.div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    </motion.div>
  );
};

export default ReceiveComponent;
