import React from "react";
import {Form} from "react-bootstrap";

const TextAreaComponent = ({label, name, rows, ...rest}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="textarea" rows={5} name={name} {...rest} />
    </Form.Group>
  );
};

export default TextAreaComponent;
