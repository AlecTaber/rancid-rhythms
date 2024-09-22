import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Nav = () => {
  return (
    <nav className="bg-green-700 p-4">
      <div className="container mx-auto flex justify-end">
        <ul className="flex space-x-4 mr-4">
          <SearchBar />
          <li>
            <NavLink to="/" className="text-3xl hover:text-green-200">Home</NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="text-3xl hover:text-green-200">Profile</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
