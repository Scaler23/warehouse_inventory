import React from "react";
import {Form} from "react-bootstrap";
import {ErrorMessage} from "formik";
const SelectComponent = ({label, name, options, ...rest}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Select
        aria-label="Default select example"
        name={name}
        // defaultValue=""
        {...rest}
      >
        <option value="" disabled={true}>
          -- Select {label} --
        </option>
        {options.map((option) => (
          <option
            key={option.key}
            value={option.value}
            style={{backgroundColor: option.color && option.color}}
          >
            {option.display}
          </option>
        ))}
      </Form.Select>
      <ErrorMessage name={name} />
    </Form.Group>
  );
};

export default SelectComponent;
