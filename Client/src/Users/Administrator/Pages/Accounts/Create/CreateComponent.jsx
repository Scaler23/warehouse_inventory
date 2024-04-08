import {Formik, Form} from "formik";
import {toast} from "react-toastify";
import {motion} from "framer-motion";
import {roles} from "../../../../../api/account";
import {register} from "../../../../../api/account";
import React, {useEffect, useState} from "react";
import {Col, Row, Card, Button} from "react-bootstrap";
import initialValues from "../../../../../utils/initialValues.json";
import FormikControl from "../../../../../components/Formik/FormikControl";
const CreateComponent = () => {
  const [userRolesData, setUserRolesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await roles();
        const {data} = response;
        setUserRolesData(data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAccountCreation = async (values) => {
    try {
      const response = await register(values);
      toast(response.message, {
        icon: <i className="bx bxs-layer-plus"></i>,
        progressClassName:
          "Toastify__toast-theme--colored Toastify__toast--info ",
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
      console.error("Signup error:", error);
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
          <h4>Creatify</h4>
          <Formik
            initialValues={initialValues.creationFields}
            onSubmit={handleAccountCreation}
          >
            {(formik) => (
              <Form>
                <Row>
                  <Col sm={12} md={4} className="mb-3">
                    <FormikControl
                      control="input"
                      type="text"
                      label="Username"
                      name="username"
                      onChange={formik.handleChange}
                      placeholder="ex: juanwms"
                    />
                  </Col>
                  <Col sm={12} md={4} className="mb-3">
                    <FormikControl
                      control="input"
                      type="email"
                      label="Email"
                      name="email"
                      onChange={formik.handleChange}
                      placeholder="ex: juanwms@gmail.com"
                    />
                  </Col>
                  <Col sm={12} md={4} className="mb-3">
                    <FormikControl
                      control="input"
                      type="password"
                      label="Password"
                      name="password"
                      onChange={formik.handleChange}
                      placeholder="&#9676;&#9676;&#9676;&#9676;&#9676;&#9676;&#9676;&#9676;&#9676;"
                    />
                  </Col>
                  <Col sm={12} md={3} className="mb-3">
                    <FormikControl
                      control="input"
                      type="number"
                      label="Contact"
                      name="contact"
                      onChange={formik.handleChange}
                      placeholder="ex: 09&#9677;&#9677;&#9677;&#9677;&#9677;&#9677;&#9677;&#9677;&#9677;"
                    />
                  </Col>
                  <Col sm={12} md={7} className="mb-3">
                    <FormikControl
                      control="input"
                      type="text"
                      label="Address"
                      name="address"
                      onChange={formik.handleChange}
                      placeholder="ex: #147 Area 5 Luzon Avenue QC."
                    />
                  </Col>
                  <Col sm={12} md={2} className="mb-3">
                    <FormikControl
                      control="input"
                      type="number"
                      label="Age"
                      name="age"
                      min={18}
                      onChange={formik.handleChange}
                    />
                  </Col>
                  <Col sm={12} md={5} className="mb-3">
                    <FormikControl
                      control="input"
                      type="text"
                      label="Profile Image Url"
                      name="image_link"
                      placeholder="https://facebook.com/nyel?=31v12324234355v2"
                      onChange={formik.handleChange}
                    />
                  </Col>
                  <Col sm={12} md={4} className="mb-3">
                    {userRolesData ? (
                      <FormikControl
                        control="select"
                        label="Role"
                        name="user_role"
                        onChange={formik.handleChange}
                        defaultValue=""
                        options={userRolesData.map((roles) => {
                          return {
                            key: roles.role_name,
                            value: roles.role_id,
                            display: roles.role_name,
                          };
                        })}
                      />
                    ) : (
                      <h5 className="text-danger">
                        Ain't gonna work - create role first
                      </h5>
                      // <Button variant="secondary">Create Role</Button>
                    )}
                  </Col>
                  <Col sm={12} md={3}>
                    <FormikControl
                      control="select"
                      label="Marital Status"
                      name="marital_status"
                      onChange={formik.handleChange}
                      defaultValue=""
                      options={[
                        {
                          key: "single",
                          value: "Single",
                          display: "Single",
                        },
                        {
                          key: "married",
                          value: "Married",
                          display: "Married",
                        },
                      ]}
                    />
                  </Col>
                  <Col sm={12} lg={12} className="d-flex flex-row-reverse p-4">
                    <motion.div
                      whileHover={{scale: 1.05}}
                      whileTap={{scale: 0.9}}
                    >
                      <Button variant="primary" className="p-2" type="submit">
                        Add User
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

export default CreateComponent;
