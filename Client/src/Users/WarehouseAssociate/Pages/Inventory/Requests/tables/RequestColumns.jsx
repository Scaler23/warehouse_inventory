import React, {useState} from "react";
import {formatHumanReadableDate} from "../../../../../../utils/dateConverter";
import {Button} from "react-bootstrap";

const RequestColumns = () => {
  const [receiving, setReceiving] = useState();

  const receivingSupply = (sku) => {
    console.log(sku);
    // setReceiving(true);
  };
  // Define your handleReceive function here
  const columns = [
    {
      dataField: "request_id",
      text: "Request ID",
      hidden: true,
      editable: false,
    },
    {
      dataField: "item_name",
      text: "Product Name",
      hidden: false,
      sort: true,
      editable: false,
    },
    {
      dataField: "supply_code",
      text: "sku",
      hidden: true,
      sort: true,
      editable: false,
    },
    {
      dataField: "storage_name",
      text: "Storage",
      hidden: false,
      sort: true,
      editable: false,
    },
    {
      dataField: "quantity",
      text: "QTY/Units",
      hidden: false,
      editable: false,
    },
    {
      dataField: "requester",
      text: "requester",
      hidden: true,
      sort: true,
      editable: false,
    },
    {
      dataField: "comments",
      text: "Notes",
      hidden: false,
      editable: false,
    },
    {
      dataField: "status",
      text: "Action",
      hidden: false,
      sort: true,
      headerAlign: "center",
      style: {backgroundColor: "whitesmoke"},
      align: "center",
      formatter(cell, row) {
        return cell === "Pending" ? (
          <Button
            variant="primary"
            className="px-3 py-2"
            onClick={() => receivingSupply(row.supply_code)}
          >
            Received
          </Button>
        ) : (
          <div>Checking ..</div>
        );
      },
      editable: false,
    },
    {
      dataField: "date_requested",
      text: "Request Date",
      hidden: true,
      formatter(cell, row) {
        return formatHumanReadableDate(cell);
      },
      editable: false,
    },
    {
      dataField: "date_expected",
      text: "Expected Date",
      hidden: true,
      editable: false,
    },
    {
      dataField: "date_arrived",
      text: "Arrived Date",
      hidden: true,
      editable: false,
    },
  ];

  return {receiving, setReceiving, columns};
};

export default RequestColumns;
