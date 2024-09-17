import React from 'react';
import {NavLink} from 'react-router-dom';
import SearchBar from './SearchBar';

const Nav = () => {
  return (
    <nav className="bg-green-700">
      <div className="container mx-auto flex justify-end">
        <ul className="flex space-x-4 mr-4">
            <SearchBar />
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