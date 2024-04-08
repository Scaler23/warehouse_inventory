import React, {useEffect, useState} from "react";
import BSTableComponent from "../../../../../components/BSTableComponent";
import {getSupplies} from "../../../../../../api/supply";
import {columns} from "./SupplyColumns";
const SupplyTable = () => {
  const [supply, setSupply] = useState([]);

  useEffect(() => {
    getSuppliesData();
  }, []);

  const getSuppliesData = async () => {
    try {
      const data = await getSupplies();
      setSupply(data);
    } catch (error) {
      console.error("cannot fetch data", error);
    }
  };
  const expandRow = {
    renderer: (row) => (
      <div>
        <p>
          <strong>Date Requested</strong>{" "}
          {formatHumanReadableDate(row.date_requested)}
        </p>
        <p>
          <strong>Date Expected:</strong>{" "}
          {formatHumanReadableDate(row.date_expected)}
        </p>
        <p>
          <strong>Date Arrived:</strong> {row.date_completed}
        </p>
        <p>
          <strong>Notes:</strong> {row.comments}
        </p>

        {/* Add additional information as needed */}
      </div>
    ),
    // showExpandColumn: true,
    onlyOneExpanding: true,
  };

  return (
    <BSTableComponent
      BSKey="request_id"
      BSData={supply}
      BSColumn={columns}
      BSexpandRow={expandRow}
    />
  );
};

export default SupplyTable;
