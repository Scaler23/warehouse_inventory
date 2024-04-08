import React, {useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import SupplyManageComponent from "./SupplyManageComponent";
import SuppliesViewerComponent from "./SuppliesViewerComponent";
const SupplyComponent = () => {
  const [isManageSupply, isSetManageSupply] = useState(false);
  const [supplyData, setSupplyData] = useState([]);
  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Welcome to Supplies Management!</Alert.Heading>
        <p>
          🎉 Get ready to optimize your inventory! 📦 Pick a storage location,
          and unlock a world of organized supplies ready for action. 💼
        </p>
      </Alert>
      {isManageSupply ? (
        <SupplyManageComponent
          isSetManageSupply={isSetManageSupply}
          supplyData={supplyData}
        />
      ) : (
        <SuppliesViewerComponent
          isSetManageSupply={isSetManageSupply}
          setSupplyData={setSupplyData}
        />
      )}
    </>
  );
};

export default SupplyComponent;
