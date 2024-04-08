import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Card} from "react-bootstrap";
import UpdateUsersTable from "../Table/UpdateUsersTable";
import UpdateForm from "../forms/UpdateForm";

const UpdateComponent = () => {
  const [dataToUpdate, setDataToUpdate] = useState([]);
  const [isInitiateForm, setIsInitiateForm] = useState(false);
  return (
    <motion.div
      initial={{opacity: 0.6, translateX: 50}}
      whileInView={{
        opacity: 1,
        translateX: 0,
        transition: {duration: 0.5, ease: "easeInOut"}, // Applying ease effect
      }}
    >
      <Card>
        <Card.Body>
          <h4>Updatify</h4>
          {isInitiateForm ? (
            <UpdateForm dataToUpdate={dataToUpdate} />
          ) : (
            <UpdateUsersTable
              setDataToUpdate={setDataToUpdate}
              setIsInitiateForm={setIsInitiateForm}
            />
          )}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default UpdateComponent;
