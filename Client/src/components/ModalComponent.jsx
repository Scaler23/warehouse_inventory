import React, {Children} from "react";
import {Modal} from "react-bootstrap";
const ModalComponent = ({showModal, closeModal, title, children}) => {
  return (
    <Modal show={showModal} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
