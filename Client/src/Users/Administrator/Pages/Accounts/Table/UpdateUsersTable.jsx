import React, {useEffect, useState} from "react";
import {columns} from "./UpdateUserColumn";
import BSTableComponent from "../../../../../components/BSTableComponent";
import {getUsers} from "../../../../../api/account";
const UpdateUsersTable = ({setDataToUpdate, setIsInitiateForm}) => {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const fetchDataUsers = async () => {
      try {
        const response = await getUsers();
        const {data} = response;
        setUsersData(data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchDataUsers();
  }, []);

  const BSRowEvent = {
    onClick: (e, row, rowIndex) => {
      const updatedRow = {};

      // Loop through each key-value pair in the row object
      Object.entries(row).forEach(([key, value]) => {
        // Transform the key to have "upd_" prefix
        const updatedKey = `upd_${key}`;

        // Assign the updated key and value to the updatedRow object
        updatedRow[updatedKey] = value;
      });

      // Log the updated row for debugging purposes
      console.log(updatedRow);

      // Set the updated data to update
      setDataToUpdate(updatedRow);

      // Set the flag to indicate initiation of the form
      setIsInitiateForm(true);
    },
  };

  return (
    <BSTableComponent
      BSKey="id"
      BSData={usersData}
      BSColumn={columns}
      //   BSexpandRow={expandRow}
      BSRowEvent={BSRowEvent}
    />
  );
};

export default UpdateUsersTable;
