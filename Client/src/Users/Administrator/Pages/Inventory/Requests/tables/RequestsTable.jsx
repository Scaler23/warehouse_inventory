import React, {useState, useEffect} from "react";
import {columns as supReqColumns} from "./RequestColumns";
import {getSupplies} from "../../../../../../api/supply";
import BSTableComponent from "../../../../../../components/BSTableComponent";
import {formatHumanReadableDate} from "../../../../../../utils/dateConverter";
const RequestsTable = () => {
  const [SupReqData, setSupReqData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSupplies();
        console.log(data);
        setSupReqData(data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchData();
  }, []);

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
    <>
      <BSTableComponent
        BSKey="request_id"
        BSData={SupReqData}
        BSColumn={supReqColumns}
        BSexpandRow={expandRow}
      />
    </>
  );
};

export default RequestsTable;
