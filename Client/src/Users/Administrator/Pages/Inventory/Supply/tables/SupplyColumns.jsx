import {formatHumanReadableDate} from "../../../../../../utils/dateConverter";
export const columns = [
  {dataField: "request_id", text: "Request ID", hidden: true},
  {dataField: "item_name", text: "Product Name", hidden: false, sort: true},
  {
    dataField: "quantity",
    text: "QTY/Units",
    hidden: false,
  },
  {
    dataField: "requester",
    text: "requester",
    hidden: false,
    sort: true,
  },
  {
    dataField: "storage_name",
    text: "Storage",
    hidden: true,
    sort: true,
  },
  {
    dataField: "status",
    text: "Status",
    hidden: false,
    sort: true,
    style: (cell, row) => {
      return {
        backgroundColor: cell === "Pending" ? "green" : "red",
        color: "white",
      };
    },
  },
  {
    dataField: "date_requested",
    text: "Request Date",
    hidden: true,
    formatter(cell, row) {
      return formatHumanReadableDate(cell);
    },
  },
  {
    dataField: "date_expected",
    text: "Expected Date",
    hidden: true,
  },
  {
    dataField: "date_arrived",
    text: "Arrived Date",
    hidden: true,
  },
  {
    dataField: "comments",
    text: "Notes",
    hidden: true,
  },
];
