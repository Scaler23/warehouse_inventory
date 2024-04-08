export const columns = [
  {dataField: "id", text: "ID", hidden: true},
  {dataField: "name", text: "Storage Name", hidden: false, sort: true},
  {
    dataField: "location",
    text: "Storage Location",
    hidden: false,
  },
  {
    dataField: "description",
    text: "Description",
    hidden: true,
    sort: true,
  },
  {
    dataField: "capacity",
    text: "Capacity",
    hidden: false,
    sort: true,
    formatter: (cell, row) => {
      // Customize the rendering of the "Price" cell, you can use your currency conversion function here
      return <span>{`${cell.toLocaleString()} units`}</span>;
    },
  },
  {
    dataField: "created_at",
    text: "Created At",
    hidden: true,
  },
];
