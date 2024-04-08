import React, {useEffect, useState} from "react";
import {Row, Col} from "react-bootstrap";
import PeopleComponent from "./PeopleComponent";
import {useSessionContext} from "../../hooks/useSessionContext";
import {useWebSocket} from "../../hooks/useWebSocket";
import MessagesComponent from "./MessagesComponent";

const Messenger = () => {
  const [displayMessages, setDisplayMessages] = useState([]);
  const [isShownChatBox, setIsShownChatBox] = useState(false);
  const {socket} = useWebSocket();
  const {sessionData} = useSessionContext();

  useEffect(() => {
    // socket.emit("online-user", sessionData.data);
    socket.emit("reconnect-user", sessionData);
  }, []);

  return (
    <Row>
      <Col lg={4}>
        <PeopleComponent
          setDisplayMessages={setDisplayMessages}
          setIsShownChatBox={setIsShownChatBox}
          isShownChatBox={isShownChatBox}
        />
      </Col>
      <Col lg={8}>
        {isShownChatBox && <MessagesComponent data={displayMessages} />}
      </Col>
    </Row>
  );
};

export default Messenger;
