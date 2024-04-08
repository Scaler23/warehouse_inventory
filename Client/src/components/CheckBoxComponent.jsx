// FormikControl.js
import React from "react";
import {Field, ErrorMessage} from "formik";
import {Form} from "react-bootstrap";

const Checkbox = ({label, name, ...rest}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Check
        type="checkbox"
        id={name}
        label={label}
        {...rest}
        as={Field}
        name={name}
      />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </Form.Group>
  );
};

export default Checkbox;
