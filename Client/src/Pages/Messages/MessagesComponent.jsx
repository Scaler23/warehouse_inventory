import {useEffect, useState, useRef} from "react";
import {Card, Button} from "react-bootstrap";
import {motion} from "framer-motion";
import {store} from "../../api/message";
import {formatHumanReadableDate} from "../../utils/dateConverter";
import {useSessionContext} from "../../hooks/useSessionContext";
import {useWebSocket} from "../../hooks/useWebSocket";

const MessagesComponent = ({data}) => {
  const {sessionData} = useSessionContext();
  const {socket} = useWebSocket();
  const [message, setMessage] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatInput = useRef();

  useEffect(() => {
    console.log("Data in Messenger component:", data);
    if (data) {
      setMessage(data.recent_conversation);
    }
  }, [data]);

  useEffect(() => {
    socket.on(
      "receive-message",
      ({sender_id, receiver_id, content, sent_at}) => {
        setMessage((prevMessages) => [
          ...prevMessages,
          {sender_id, receiver_id, content, sent_at}, // Include both sender and content in the message object
        ]); // Append new message to the array
      }
    );

    // Cleanup function to remove the event listener on unmount (optional)
    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  const insertMessage = async (data) => {
    try {
      const res = await store(data);
      console.log(res);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDateTime = new Date();

    const senderDetails = {
      sender_id: sessionData.data.id,
      receiver_id: data.person_id,
      content: inputValue,
      sent_at: newDateTime,
    };

    setMessage((prevMessages) => [...prevMessages, senderDetails]);

    socket.emit("private-message", senderDetails);
    insertMessage(senderDetails);

    setInputValue("");
    chatInput.current.value = "";
  };

  return (
    <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}}>
      <Card>
        <Card.Header>
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            style={{color: "black", fontSize: "25px"}}
          >
            {data.person_username}
          </motion.div>
        </Card.Header>
        <Card.Body
          style={{overflowY: "auto", maxHeight: "70vh", height: "70vh"}}
        >
          <ul style={{listStyleType: "none", padding: 0}}>
            {message &&
              message.map((item, index) => {
                return (
                  ((item.receiver_id === data.person_id &&
                    item.sender_id === sessionData.data.id) ||
                    (item.receiver_id === sessionData.data.id &&
                      item.sender_id === data.person_id)) && (
                    <li key={index} className={"d-flex mb-3"}>
                      <div
                        style={{
                          fontSize: "9px",
                          color: "#919191 ",
                          marginLeft:
                            item.sender_id === sessionData.data.id
                              ? "auto"
                              : "unset",
                          marginRight:
                            item.sender_id === sessionData.data.id
                              ? "unset"
                              : "auto",
                        }}
                      >
                        <div>{formatHumanReadableDate(item.sent_at)}</div>
                        <div
                          style={{
                            background: "#0047AB",
                            backdropFilter: "blur(10px)",
                            color: "white",
                            maxWidth: "40ch",
                            padding: "20px 25px",
                            fontSize: "12px",
                            borderRadius:
                              item.sender_id === sessionData.data.id
                                ? "14px 0 14px 14px"
                                : "0 14px 14px 14px",
                          }}
                        >
                          {item.content}
                        </div>
                      </div>
                    </li>
                  )
                );
              })}
          </ul>
        </Card.Body>
        <Card.Footer className="">
          <form onSubmit={handleSubmit} id="form" className="d-flex flex-row">
            <input
              ref={chatInput}
              type="text"
              className="form-control"
              style={{marginRight: "5px"}}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <Button type="submit" style={{padding: "5px 30px"}}>
              send
            </Button>
          </form>
        </Card.Footer>
      </Card>
    </motion.div>
  );
};

export default MessagesComponent;
