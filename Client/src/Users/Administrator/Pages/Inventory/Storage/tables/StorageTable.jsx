import BSTableComponent from "../../../../../../components/BSTableComponent";
import {columns as storageColumn} from "./StorageColumns";
import {formatHumanReadableDate} from "../../../../../../utils/dateConverter";
import {motion} from "framer-motion";
import {Button} from "react-bootstrap";
const StorageTable = ({setIsShownStorageLocation, storageData}) => {
  const expandRow = {
    renderer: (row) => (
      <div>
        <p>
          <strong>Description:</strong> {row.description}
        </p>
        <p>
          <strong>Date Created</strong>{" "}
          {formatHumanReadableDate(row.created_at)}
        </p>
      </div>
    ),
    onlyOneExpanding: true,
  };

  return (
    <div>
      <div className="w-100 d-flex">
        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.9}}>
          <Button
            variant="outline-info"
            className="mb-3 px-3"
            onClick={() => setIsShownStorageLocation(true)}
          >
            Manage Storage
          </Button>
        </motion.div>
      </div>
      <BSTableComponent
        BSKey="id"
        BSData={storageData}
        BSColumn={storageColumn}
        BSexpandRow={expandRow}
      />
    </div>
  );
};

export default StorageTable;
