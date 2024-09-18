import React from "react";
import { FaMusic } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-green-500 flex items-center justify-between p-4">
      <FaMusic className="text-3xl text-black" />
      <h1
        className="text-5xl text-center font-extrabold text-black tracking-wide"
        style={{ fontFamily: "'Bangers', cursive" }} // Adding Google Font
      >
        Rancid Rhythms
      </h1>
      <button className="float-right bg-white mt-3 rounded-md pr-2 pl-2 text-green-500">
        Sign In
      </button>
    </header>
  );
};

export default Header;
