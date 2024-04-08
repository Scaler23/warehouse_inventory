import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "./useAuthContext";
import {socket} from "../socket";
import {useSessionContext} from "./useSessionContext";
export const useLogOut = () => {
  const navigate = useNavigate();
  const {dispatch} = useAuthContext();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {sessionData} = useSessionContext();

  function socketOffline() {
    socket.emit("offline-user", sessionData.data);
    socket.disconnect();
  }

  const logout = () => {
    socketOffline();
    dispatch({type: "LOGOUT"});
    navigate("/login");
  };

  return {logout};
};
