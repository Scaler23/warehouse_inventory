import React, {useState, useEffect} from "react";
import ModalComponent from "../../../../../components/ModalComponent";
import RequestsTable from "./tables/RequestsTable";
import RequestForm from "./forms/RequestForm";
import StorageLocForm from "../Storage/forms/StorageForm";
const RequestsComponent = () => {
  const [isShownStorageLocation, setIsShownStorageLocation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Replenish
      </div>
      <RequestsTable />
      <ModalComponent showModal={showModal} closeModal={handleCloseModal}>
        {isShownStorageLocation ? (
          <StorageLocForm
            setIsShownStorageLocation={setIsShownStorageLocation}
          />
        ) : (
          <RequestForm setIsShownStorageLocation={setIsShownStorageLocation} />
        )}
      </ModalComponent>
    </>
  );
};

export default RequestsComponent;
