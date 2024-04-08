import React, {useEffect, useState} from "react";
import {Formik, Form} from "formik";
import {Col, Row, Card, Button} from "react-bootstrap";
import {roles} from "../../../../../api/account";
import FormikControl from "../../../../../components/Formik/FormikControl";
import {motion} from "framer-motion";
import {toast} from "react-toastify";
const UpdateForm = ({dataToUpdate}) => {
  const [updateData, setUpdateData] = useState({}); // Initialize empty state for initial values
  const [userRoles, setUserRoles] = useState([]); // Initialize empty state for user roles

  useEffect(() => {
    const fetchDataRoles = async () => {
      try {
        const response = await roles();
        const {data} = response;
        setUserRoles(data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
        // Implement error handling (e.g., display error message)
      }
    };

    fetchDataRoles();
  }, []);

  useEffect(() => {
    if (dataToUpdate) {
      setUpdateData(dataToUpdate); // Update initial values only if dataToUpdate exists
    }
  }, [dataToUpdate]);

  const formikStructure = [
    {
      fieldkey: 1,
      control: "input",
      type: "text",
      label: "Username",
      name: "upd_name",
      placeholder: "ex: juanwms",
      md: 4,
      initialValue: updateData?.upd_name,
    },
    {
      fieldkey: 2,
      control: "input",
      type: "email",
      label: "Email",
      name: "upd_email",
      placeholder: "ex: juanwms@gmail.com",
      md: 4,
      initialValue: updateData?.upd_email,
    },
    {
      fieldkey: 3,
      control: "input",
      type: "password",
      label: "Password",
      name: "upd_password",
      placeholder:
        "&#9676;&#9676;&#9676;&#9676;&#9676;&#9676;&#9676;&#9676;&#9676;",
      md: 4,
      //   initialValue: updateData?.upd_password,
    },
    {
      fieldkey: 4,
      control: "input",
      type: "number",
      label: "Contact",
      name: "upd_contact",
      placeholder:
        "ex: 09&#9677;&#9677;&#9677;&#9677;&#9677;&#9677;&#9677;&#9677;&#9677;",
      md: 3,
      initialValue: updateData?.upd_contact,
    },
    {
      fieldkey: 5,
      control: "input",
      type: "text",
      label: "Address",
      name: "upd_address",
      placeholder: "ex: #147 Area 5 Luzon Avenue QC.",
      md: 7,
      initialValue: updateData?.upd_address,
    },
    {
      fieldkey: 6,
      control: "input",
      type: "number",
      label: "Age",
      name: "upd_age",
      min: 18,
      md: 2,
      initialValue: updateData?.upd_age,
    },
    {
      fieldkey: 7,
      control: "select",
      label: "Role",
      name: "upd_user_role",
      options: userRoles.map((roles) => {
        return {
          key: roles.user_role,
          value: roles.role_name,
          display: roles.role_name,
        };
      }),
      md: 4,
      initialValue: updateData?.upd_user_role,
    },
    {
      fieldkey: 8,
      control: "select",
      label: "Marital Status",
      name: "upd_marital_status",
      options: [
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
      ],
      md: 3,
      initialValue: updateData?.upd_marital_status,
    },
  ];

  const handleAccountUpdate = async (values) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
      console.error("Signup error:", error);
    }
  };
  return (
    <Formik initialValues={updateData} onSubmit={handleAccountUpdate}>
      {(formik) => (
        <Form>
          <Row>
            {formikStructure.map((structure) => {
              return (
                <Col
                  sm={12}
                  md={structure.md}
                  className="mb-3"
                  key={structure.fieldkey}
                >
                  {structure.control === "input" ? (
                    <FormikControl
                      control={structure.control}
                      type={structure.type}
                      label={structure.label}
                      name={structure.name}
                      onChange={formik.handleChange}
                      defaultValue={structure.initialValue}
                      //   placeholder={structure.placeholder}
                      placeholder={
                        structure.name === "upd_password" &&
                        "◌◌◌◌◌◌◌◌◌◌◌◌◌◌◌◌◌◌"
                      }
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
              <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.9}}>
                <Button variant="primary" className="p-2" type="submit">
                  Update User
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateForm;
