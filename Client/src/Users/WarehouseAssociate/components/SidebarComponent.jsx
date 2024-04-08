import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useLogOut} from "../../../hooks/useLogOut";
import {useSessionContext} from "../../../hooks/useSessionContext";
// import {socket} from "../socket";
import {useWebSocket} from "../../../hooks/useWebSocket";
const Sidebar = () => {
  const {sessionData} = useSessionContext();
  const {logout} = useLogOut();
  const {socket, setOnlineUsers} = useWebSocket();

  useEffect(() => {
    if (sessionData && sessionData.data) {
      socket.connect();
      socket.emit("online-user", sessionData.data);
    }

    return () => {
      socket.disconnect();
    };
  }, [socket, sessionData]);

  useEffect(() => {
    function handleUserSet(data) {
      setOnlineUsers(data);
    }
    socket.on("online-users", handleUserSet);

    return () => {
      socket.off("online-users", handleUserSet);
    };
  }, [socket, setOnlineUsers]);

  const handleSideMenuItemClick = (e) => {
    const sideLinks = document.querySelectorAll(
      ".sidebar .side-menu li a:not(.logout)"
    );
    sideLinks.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    e.target.parentElement.classList.add("active");
  };

  useEffect(() => {
    const sideLinks = document.querySelectorAll(
      ".sidebar .side-menu li a:not(.logout)"
    );
    sideLinks.forEach((item) => {
      item.addEventListener("click", handleSideMenuItemClick);
    });

    return () => {
      sideLinks.forEach((item) => {
        item.removeEventListener("click", handleSideMenuItemClick);
      });
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="sidebar">
      <Link to="/dashboard" className="logo">
        <img className="kargada" src="/kargada.png" alt="Company Logo" />
        <div className="logo-name">
          <span>Kar</span>gada
        </div>
      </Link>

      <div className="side-menu d-flex align-items-center">
        <span className="" style={{paddingLeft: "5px"}}>
          {sessionData && sessionData.data.image_link ? (
            <img
              src={sessionData.data.image_link}
              alt="profileImage"
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
              alt="profileImage"
              style={{
                width: "50px",
                height: "50px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
              className="rounded-circle"
            />
          )}
        </span>
        <ul className="p-0" style={{marginBottom: 0}}>
          <li>
            <Link
              to="/wa/inventory"
              className="home"
              style={{fontSize: "20px", fontWeight: 700}}
            >
              {sessionData && sessionData.data.name}
            </Link>
          </li>
        </ul>
      </div>
      <ul className="side-menu">
        <li>
          <Link to="/wa/inventory">
            <i className="bx bx-store-alt"></i>
            Inventory
          </Link>
        </li>
        <li>
          <Link to="/wa/messages">
            <i className="bx bx-message"></i>
            Messages
          </Link>
        </li>
        {sessionData &&
          sessionData.data.role_name !== "Logistics Coordinator" && (
            <li>
              <Link to="/wa/account">
                <i className="bx bx-group"></i>
                Account
              </Link>
            </li>
          )}
      </ul>
      <ul className="side-menu">
        <li>
          <a onClick={handleLogout}>
            <i className="bx bx-log-out-circle"></i>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
