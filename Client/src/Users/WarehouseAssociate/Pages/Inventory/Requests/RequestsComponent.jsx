import React, {useState, useEffect} from "react";
import RequestsTable from "./tables/RequestsTable";
const RequestSupply = () => {
  const [isShownStorageLocation, setIsShownStorageLocation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <RequestsTable />
    </>
  );
};

export default RequestSupply;
