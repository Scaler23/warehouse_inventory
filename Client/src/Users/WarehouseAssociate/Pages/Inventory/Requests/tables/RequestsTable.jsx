import React, {useState, useEffect} from "react";
import RequestColumns from "./RequestColumns";
import {getSupplies} from "../../../../../../api/supply";
import BSTableComponent from "../../../../../../components/BSTableComponent";
import {formatHumanReadableDate} from "../../../../../../utils/dateConverter";
import ReceiveComponent from "./Receive/ReceiveComponent";
const RequestsTable = () => {
  const {receiving, setReceiving, columns} = RequestColumns();
  const [SupReqData, setSupReqData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSupplies();
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
        {/* <p>
          <strong>Date Arrived:</strong> {row.date_completed}
        </p> */}
        <p>
          <strong>Requestor:</strong> {row.requester}
        </p>

        {/* Add additional information as needed */}
      </div>
    ),
    // showExpandColumn: true,
    onlyOneExpanding: true,
  };
  return (
    <>
      {receiving ? (
        <ReceiveComponent setReceiving={setReceiving} />
      ) : (
        <BSTableComponent
          BSKey="request_id"
          BSData={SupReqData}
          BSColumn={columns}
          BSexpandRow={expandRow}
        />
      )}
    </>
  );
};

export default RequestsTable;
