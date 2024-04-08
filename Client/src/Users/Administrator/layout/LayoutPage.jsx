import {Outlet} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./dashboard.css";
import Sidebar from "../components/SidebarComponent";
import Menubar from "../../../components/MenubarComponent";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {motion} from "framer-motion";

const AdminLayoutPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle dark mode state
  };

  useEffect(() => {
    const toggler = document.getElementById("theme-toggle");
    toggler.addEventListener("change", handleThemeToggle);

    return () => {
      toggler.removeEventListener("change", handleThemeToggle);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <ToastContainer />
      <Sidebar />
      <div className="content">
        <Menubar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayoutPage;
