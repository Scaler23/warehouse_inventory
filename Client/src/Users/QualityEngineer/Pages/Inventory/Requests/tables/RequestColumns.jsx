import React, {useState} from "react";
import {formatHumanReadableDate} from "../../../../../../utils/dateConverter";
import {Button} from "react-bootstrap";
import {Type} from "react-bootstrap-table2-editor";

const RequestColumns = () => {
  const [receiving, setReceiving] = useState(false);
  const [productSku, setProductSku] = useState(null);
  const receivingSupply = (sku) => {
    setProductSku(sku);
    setReceiving(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green"; // or any color you prefer for completed
      case "On hold":
        return "yellow"; // or any color you prefer for on hold
      case "Checking":
        return "orange"; // or any color you prefer for checking
      case "Rejected":
        return "red"; // or any color you prefer for rejected
      case "Cancelled":
        return "gray"; // or any color you prefer for cancelled
      default:
        return "transparent"; // default color
    }
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
      style: (cell, row) => ({
        backgroundColor:
          cell === "Pending" ? "whitesmoke" : getStatusColor(cell),
        color: "white",
      }),
      align: "center",
      formatter(cell, row) {
        if (cell === "Pending") {
          return (
            <Button
              variant="primary"
              className="px-3 py-2"
              onClick={() => receivingSupply(row.supply_code)}
            >
              Received
            </Button>
          );
        } else {
          return <div>{cell}</div>;
        }
      },
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "Cancelled",
            label: "Cancelled",
          },
          {
            value: "Recjected",
            label: "Recjected",
          },
          {
            value: "On hold",
            label: "On hold",
          },
        ],
      },
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

  return {receiving, productSku, setReceiving, columns};
};

export default RequestColumns;
