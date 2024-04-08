import React, {useEffect, useState} from "react";
import {ListGroup} from "react-bootstrap";
import {getMessages, getMessage} from "../../api/message";
import {GoDot, GoDotFill} from "react-icons/go";
import {useSessionContext} from "../../hooks/useSessionContext";
import {useWebSocket} from "../../hooks/useWebSocket";
import {motion} from "framer-motion";
const peopleComponent = ({setDisplayMessages, setIsShownChatBox}) => {
  const [people, setpeople] = useState([]);
  const {onlineUsers} = useWebSocket();
  const {sessionData} = useSessionContext();
  useEffect(() => {
    viewMessages();
  }, [sessionData, onlineUsers]);

  const viewMessages = async () => {
    try {
      const res = await getMessages({
        data: sessionData.data,
        token: sessionData.token,
      });
      const data = await res;
      setpeople(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const viewMessage = async (person) => {
    try {
      return await getMessage({
        my_token: sessionData.token,
        my_id: sessionData.data.id,
        contact_person: person.user_id,
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  function handleActiveCircle(users, person) {
    return users.find((user) => {
      return user.userId === person.user_id;
    })?.isActive;
  }

  async function handleChatBox(person) {
    setIsShownChatBox(true);
    console.log(person);
    // Call the viewMessage
    viewMessage(person)
      .then((recentConversation) => {
        // Once the promise resolves, update the state
        console.log(recentConversation);
        setDisplayMessages({
          person_username: person.user_name,
          person_id: person.user_id,
          recent_conversation: recentConversation,
        });
      })
      .catch((error) => {
        // Handle any errors if the promise rejects
        console.error("Error fetching private messages:", error);
        // Optionally, update state to indicate error or take other actions
      });
  }

  return (
    <motion.div
      initial={{scale: 0.5, opacity: 0}}
      whileInView={{scale: 1, opacity: 1}}
      transition={{duration: 0.4}}
    >
      <ListGroup
        defaultActiveKey="#link1"
        style={{
          overflowY: "auto",
          maxHeight: "85vh",
          height: "85vh",
          backgroundColor: "rgb(231 231 231)",
        }}
      >
        {people.map((people) => {
          const isPeopleActive = handleActiveCircle(onlineUsers, people);
          return (
            <ListGroup.Item
              key={people.user_id}
              action
              // href={`#${people.user_id}`}
              style={{height: "150px", padding: "20px"}}
              className="mb-2"
              onClick={() => handleChatBox(people)}
            >
              <div style={{display: "flex"}}>
                {people.user_image_link ? (
                  <img
                    src={people.user_image_link}
                    alt="profile"
                    style={{
                      width: "50px",
                      height: "50px",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      objectFit: "cover",
                    }}
                    className="rounded-circle"
                  />
                ) : (
                  <img
                    src="https://st4.depositphotos.com/9998432/24428/v/450/depositphotos_244284796-stock-illustration-person-gray-photo-placeholder-man.jpg"
                    alt="profile"
                    style={{
                      width: "50px",
                      height: "50px",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      objectFit: "cover",
                    }}
                    className="rounded-circle"
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "20px",
                  }}
                >
                  <div style={{display: "flex"}}>
                    <span style={{fontSize: "16px"}}>{people.user_name}</span>
                    {isPeopleActive !== undefined && (
                      <>
                        {isPeopleActive ? (
                          <span>
                            <GoDotFill style={{color: "blue"}} />{" "}
                            <span
                              style={{
                                fontWeight: "300",
                                fontSize: "12px",
                                color: "green",
                              }}
                            >
                              online
                            </span>
                          </span>
                        ) : (
                          <span>
                            <GoDot />
                            <span
                              style={{
                                fontWeight: "300",
                                fontSize: "12px",
                                color: "#ccc",
                              }}
                            >
                              Offline
                            </span>
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  <span style={{color: "#808080", fontSize: "10px"}}>
                    {people && people.role_name}
                  </span>
                </div>
              </div>
              <hr />
              {people.recent_message_content ? (
                <div className="text-muted">
                  {people.recent_message_content}
                </div>
              ) : (
                <div className="text-muted" style={{fontSize: "12px"}}>
                  Start a new Conversation
                </div>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </motion.div>
  );
};

export default peopleComponent;
