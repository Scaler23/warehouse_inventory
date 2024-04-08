import React, {useState} from "react";
import {Col, Row, Card, Button, ListGroup} from "react-bootstrap";
import {motion} from "framer-motion";
import CreateComponent from "./Create/CreateComponent";
import UpdateComponent from "./Update/UpdateComponent";
import ManageRolesComponent from "./Roles/ManageRolesComponent";
const Account = () => {
  const [sessionData] = useState(
    JSON.parse(localStorage.getItem("sessionData"))
  );
  const [isRendered, setIsRendered] = useState(<CreateComponent />);
  // const [isAdminCreate, setIsAdminCreate] = useState(true);
  // const [isAdminUpdate, setIsAdminUpdate] = useState(false);
  // const [isAdminManageRoles, setIsAdminManageRoles] = useState(false);

  function handleOnOpenCreate() {
    setIsRendered(<CreateComponent />);
  }
  function handleOnOpenUpdate() {
    setIsRendered(<UpdateComponent />);
  }
  function handleOnOpenManageRoles() {
    setIsRendered(<ManageRolesComponent />);
  }
  return (
    <Row>
      <Col lg={4}>
        <motion.div
          initial={{opacity: 0.6, translateX: -50}}
          whileInView={{
            opacity: 1,
            translateX: 0,
            transition: {duration: 0.5},
          }}
        >
          <Card>
            <Card.Img
              variant="top"
              style={{
                objectFit: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "450px",
              }}
              src="https://images.pexels.com/photos/13234226/pexels-photo-13234226.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <Card.Body
              className="d-flex flex-sm-column flex-md-row justify-content-around align-items-center"
              style={{backgroundColor: "#212529"}}
            >
              <i
                className="bx bxl-facebook-square"
                style={{color: "white"}}
              ></i>
              <i
                className="bx bxl-linkedin-square"
                style={{color: "white"}}
              ></i>
              <i className="bx bxl-instagram-alt" style={{color: "white"}}></i>
              <i className="bx bxl-gmail" style={{color: "white"}}></i>
            </Card.Body>
          </Card>
        </motion.div>
      </Col>
      <Col lg={8}>
        <motion.div
          initial={{opacity: 0.6, translateY: 50}}
          whileInView={{opacity: 1, translateY: 0, transition: {duration: 0.5}}}
        >
          <Card>
            <Card.Header>
              <h3 className="m-0">Accountify</h3>
            </Card.Header>
            <Card.Body>
              <div className="w-100 d-flex">
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.9}}>
                  <Button
                    variant="success"
                    className="p-2"
                    onClick={() => handleOnOpenCreate()}
                  >
                    Create User Account
                  </Button>
                </motion.div>
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.9}}>
                  <Button
                    variant="primary"
                    className="p-2"
                    style={{marginLeft: "10px"}}
                    onClick={() => handleOnOpenUpdate()}
                  >
                    Update User Account
                  </Button>
                </motion.div>
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.9}}>
                  <Button
                    variant="outline-secondary"
                    className="p-2"
                    style={{marginLeft: "10px"}}
                    onClick={() => handleOnOpenManageRoles()}
                  >
                    Manage Roles
                  </Button>
                </motion.div>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
        {isRendered}
      </Col>
    </Row>
  );
};

export default Account;
