import React from "react";
import {Form} from "react-bootstrap";
const InputComponent = ({label, name, type, ref, ...rest}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} name={name} ref={ref} {...rest} />
    </Form.Group>
  );
};

export default InputComponent;
