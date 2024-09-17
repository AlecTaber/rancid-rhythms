import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-green-700">
      <div className="container mx-auto flex justify-end">
        <ul className="flex space-x-4 mr-4">
            <li>
            <NavLink to="/">Home</NavLink>
            </li>
            <li>
            <NavLink to="/profile">Profile</NavLink>
            </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;