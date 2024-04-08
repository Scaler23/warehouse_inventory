import React from "react";
import TextAreaComponent from "../TextAreaComponent";
import SelectComponent from "../SelectComponent";
import InputComponent from "../InputComponent";
import CheckBoxComponent from "../CheckBoxComponent";
function FormikControl({control, ...rest}) {
  switch (control) {
    case "input":
      return <InputComponent {...rest} />;
    case "textarea":
      return <TextAreaComponent {...rest} />;
    case "select":
      return <SelectComponent {...rest} />;
    case "checkbox":
      return <CheckBoxComponent {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
