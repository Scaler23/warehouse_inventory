import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
const BSTableComponent = ({
  BSKey,
  BSData,
  BSColumn,
  BSexpandRow,
  BSRowEvent,
  BShandleCellEdit,
}) => {
  const {SearchBar} = Search;
  const {ExportCSVButton} = CSVExport;
  return (
    <>
      <ToolkitProvider
        keyField={BSKey}
        data={BSData}
        columns={BSColumn}
        search
        exportCSV
      >
        {(props) => (
          <div>
            <div className="d-flex">
              <SearchBar {...props.searchProps} />
              <ExportCSVButton
                {...props.csvProps}
                className="btn btn-primary p-2"
                style={{marginLeft: "auto"}}
              >
                Export Report
              </ExportCSVButton>
            </div>

            <hr />
            <BootstrapTable
              keyField={BSKey}
              data={BSData}
              columns={BSColumn}
              expandRow={BSexpandRow}
              rowEvents={BSRowEvent}
              pagination={paginationFactory()}
              cellEdit={cellEditFactory({
                mode: "click",
                afterSaveCell: BShandleCellEdit,
                blurToSave: true,
              })}
              {...props.baseProps}
            />
          </div>
        )}
      </ToolkitProvider>
    </>
  );
};

export default BSTableComponent;
