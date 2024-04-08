import React, {useState, useEffect} from "react";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {store} from "../../../../../../api/storage";
import {Form, Button, Row, Col, InputGroup} from "react-bootstrap";
import {motion} from "framer-motion";
const StorageLocForm = ({setIsShownStorageLocation}) => {
  const onSubmit = async (values) => {
    try {
      await store(values);
      toast("Supply request submitted", {
        icon: <i className="bx bxs-layer-plus"></i>,
        progressClassName:
          "Toastify__toast-theme--colored Toastify__toast--info ",
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error submitting supply request:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      description: "",
      capacity: "",
    },
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <motion.div initial={{opacity: 0, x: 50}} whileInView={{opacity: 1, x: 0}}>
      <motion.i
        whileHover={{scale: 2}}
        whileTap={{scale: 0.9}}
        class="bx bx-left-arrow-alt"
        style={{cursor: "pointer"}}
        onClick={() => setIsShownStorageLocation(false)}
      ></motion.i>
      <Form onSubmit={formik.handleSubmit}>
        {/* {loading && <Spinner animation="border" />} */}
        <Row className="p-3">
          <Col lg={6} sm={12} className="mb-3">
            <Form.Group controlId="location">
              <Form.Label>Storage Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Col>
          <Col lg={6} sm={12} className="mb-3">
            <Form.Group controlId="location">
              <Form.Label>Storage Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Col>
          <Col lg={6} sm={12} className="mb-3">
            <Form.Label>Maximum Storage Capacity</Form.Label>
            <InputGroup controlId="capacity">
              <Form.Control
                type="number"
                name="capacity"
                value={formik.values.capacity}
                onChange={formik.handleChange}
              />
              <InputGroup.Text>Units</InputGroup.Text>
            </InputGroup>
          </Col>

          <Col lg={12} sm={12}>
            <Form.Group controlId="description">
              <Form.Label>Storage Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </motion.div>
  );
};

export default StorageLocForm;
