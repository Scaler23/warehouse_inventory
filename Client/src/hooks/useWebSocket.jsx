import {useEffect, useState} from "react";
import {socket} from "../socket";

export const useWebSocket = () => {
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log(`Socket connected ${socket.id}`);
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log(`Socket disconnected`);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    function handleOnlineUsers(data) {
      setOnlineUsers(data);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);
    socket.on("online-user", handleOnlineUsers);
    socket.on("reconnect-user", handleOnlineUsers);
    socket.on("offline-user", handleOnlineUsers);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
      socket.off("online-user", handleOnlineUsers);
      socket.off("reconnect-user", handleOnlineUsers);
      socket.off("offline-user", handleOnlineUsers);
    };
  }, []);

  return {
    socket,
    isConnected,
    setFooEvents,
    fooEvents,
    setOnlineUsers,
    onlineUsers,
  };
};
