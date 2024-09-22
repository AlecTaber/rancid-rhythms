import React from "react";
import { FaMusic } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const navigate = useNavigate();

const checkLoginStatus = () => {
  const token = localStorage.getItem("token");
  setIsLoggedIn(!!token);
};

const handleLogout = () => {
  localStorage.removeItem("token");
  const logoutEvent = new Event("authChange");
  window.dispatchEvent(logoutEvent);
  setIsLoggedIn(false);
  navigate("/signin");
};

useEffect(() => {
  checkLoginStatus();

  const handleAuthChange = () => {
    checkLoginStatus();
  };

  window.addEventListener("authChange", handleAuthChange);

  return () => {
    window.removeEventListener("authChange", handleAuthChange);
  };
}, []);

  return (
    <header className="bg-green-500 flex items-center justify-between p-4">
      <FaMusic className="text-3xl text-black" />
      <h1
        className="text-5xl text-center font-extrabold text-black tracking-wide"
        style={{ fontFamily: "'Bangers', cursive" }} // Adding Google Font
      >
        Rancid Rhythms
      </h1>
      <button onClick={isLoggedIn ? handleLogout : () => navigate("/signin")} className="float-right bg-white mt-3 rounded-md pr-2 pl-2 text-green-500">
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </header>
  );
};

export default Header;
