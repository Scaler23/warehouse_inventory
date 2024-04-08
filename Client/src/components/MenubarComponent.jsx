import React from "react";
import {useEffect} from "react";

const Menubar = () => {
  const handleMenuBarClick = () => {
    const sideBar = document.querySelector(".sidebar");
    sideBar.classList.toggle("close");
  };

  useEffect(() => {
    const menuBar = document.querySelector(".content nav .bx.bx-menu");
    menuBar.addEventListener("click", handleMenuBarClick);

    return () => {
      menuBar.removeEventListener("click", handleMenuBarClick);
    };
  }, []);

  return (
    <nav>
      <i className="bx bx-menu"></i>
      <div
        className="d-flex justify-center items-center"
        style={{marginLeft: "auto"}}
      >
        <input type="checkbox" id="theme-toggle" hidden />
        <label htmlFor="theme-toggle" className="theme-toggle"></label>
        <a href="#" className="notif">
          <i className="bx bx-bell"></i>
          <span className="count">12</span>
        </a>
      </div>
    </nav>
  );
};

export default Menubar;
