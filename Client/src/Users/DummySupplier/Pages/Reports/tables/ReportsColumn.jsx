import {Button} from "react-bootstrap";
export const columns = [
  {dataField: "requester", text: "Requester", hidden: false, editable: false},
  {
    dataField: "reports_summary",
    text: "Summary",
    hidden: false,
    sort: true,
    editable: false,
  },
  {
    dataField: "quantity",
    text: "Quantity",
    hidden: false,
    editable: false,
  },
  {
    dataField: "attachment",
    text: "Quality Control",
    hidden: false,
    editable: false,
    formatter: (cell, row) => {
      const handleDownload = () => {
        // Logic to handle download when the button is clicked
        console.log("Downloading attachment for row:", row);
        // Replace this with your actual download logic
      };
      return (
        <Button
          variant="primary"
          style={{padding: "10px 20px"}}
          onClick={handleDownload}
        >
          Download Attachment{" "}
          <i className="bx bxs-download" style={{fontSize: "20px"}}></i>
        </Button>
      );
    },
  },
];
