import React, {useEffect, useState} from "react";
import {Col, Row, Card, Button, Container} from "react-bootstrap";
import {Formik, Form} from "formik";
import FormikControl from "../../../../../../../components/Formik/FormikControl";
import {motion} from "framer-motion";
import initialValues from "../../../../../../../utils/initialValues.json";
import {store} from "../../../../../../../api/quality";
import {getAssociate} from "../../../../../../../api/account";
const ReceiveComponent = ({setReceiving, productSku}) => {
  const [associate, setAssociate] = useState([]);

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
      control: "select",
      label: "Status",
      name: "status",
      options: [
        {
          key: "Pending",
          value: "Pending",
          display: "Pending",
        },
        {
          key: "Checking",
          value: "Checking",
          display: "Checking",
        },
        {
          key: "Cancelled",
          value: "Cancelled",
          display: "Cancelled",
        },
        {
          key: "Recjected",
          value: "Recjected",
          display: "Recjected",
        },
        {
          key: "Completed",
          value: "Completed",
          display: "Completed",
        },
        {
          key: "On hold",
          value: "On hold",
          display: "On hold",
        },
      ],
      md: 6,
    },
    {
      control: "select",
      label: "Receiver",
      name: "receiver",
      options: associate.map((assoc) => {
        return {
          key: assoc.name,
          value: assoc.name,
          display: assoc.name,
        };
      }),
      md: 6,
    },
    {
      control: "input",
      type: "file",
      label: "Upload Documentation",
      name: "attachment",
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
    try {
      const response = await store({
        reports_id: productSku,
        values,
      });
      toast(response.message, {
        icon: <i className="bx bxs-layer-plus"></i>,
        progressClassName:
          "Toastify__toast-theme--colored Toastify__toast--info ",
        autoClose: 1500,
      });
      setReceiving(false);
    } catch (error) {
      console.log(error);
      console.error("Signup error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const warehouseAssociate = await getAssociate();
        setAssociate(warehouseAssociate.data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchData();
  }, [setReceiving]);

  return (
    <motion.div initial={{opacity: 0, x: 50}} whileInView={{opacity: 1, x: 0}}>
      <Container>
        <div className="d-flex flex-row">
          <motion.i
            whileHover={{scale: 1.5}}
            whileTap={{scale: 0.6}}
            className="bx bxs-arrow-to-left"
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
                {qualityControlFormStructure.map((structure, index) => {
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
