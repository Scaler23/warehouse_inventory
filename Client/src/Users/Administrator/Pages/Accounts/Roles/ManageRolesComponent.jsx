import React from "react";
import {Formik, Form} from "formik";
import {toast} from "react-toastify";
import {motion} from "framer-motion";
import {Col, Row, Card, Button} from "react-bootstrap";
import initialValues from "../../../../../utils/initialValues.json";
import FormikControl from "../../../../../components/Formik/FormikControl";
import {storeRoles} from "../../../../../api/account";

const ManageRolesComponent = () => {
  const onSubmit = async (values) => {
    try {
      // Call the function responsible for inserting supply requests
      await storeRoles(values);
      toast("Role has added", {
        icon: <i className="bx bxs-layer-plus"></i>,
        progressClassName:
          "Toastify__toast-theme--colored Toastify__toast--info ",
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error submitting supply request:", error);
    }
  };

  return (
    <motion.div
      initial={{opacity: 0.6, translateX: 50}}
      whileInView={{
        opacity: 1,
        translateX: 0,
        transition: {duration: 0.5, ease: "easeInOut"}, // Applying ease effect
      }}
    >
      <Card>
        <Card.Body>
          <h4>Rolefy</h4>
          <Formik
            initialValues={initialValues.manageRolesFields}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <Row className="p-3">
                  {initialValues.manageRolesFields.formStructure.map(
                    (structure) => (
                      <Col
                        sm={12}
                        md={structure.md}
                        className="mb-3"
                        key={structure.name} // Use name instead of fieldKey
                      >
                        {structure.control === "input" ? (
                          <FormikControl
                            control={structure.control}
                            type={structure.type}
                            label={structure.label}
                            name={structure.name}
                            onChange={formik.handleChange}
                            placeholder={
                              structure.placeholder && structure.placeholder
                            }
                            {...structure}
                          />
                        ) : (
                          <FormikControl
                            control={structure.control}
                            label={structure.label}
                            name={structure.name}
                            rows={structure.rows}
                            onChange={formik.handleChange}
                            placeholder={
                              structure.placeholder && structure.placeholder
                            }
                            {...structure}
                          />
                        )}
                      </Col>
                    )
                  )}
                  <Col sm={12} lg={12} className="d-flex flex-row-reverse">
                    <motion.div
                      whileHover={{scale: 1.05}}
                      whileTap={{scale: 0.9}}
                    >
                      <Button variant="primary" className="p-2" type="submit">
                        Send Request
                      </Button>
                    </motion.div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ManageRolesComponent;
