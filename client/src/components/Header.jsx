// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-indigo-500 text-white p-4 shadow-md">
      <nav className="flex justify-between items-center">
        <div className="text-xl font-bold">ToDo App</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/all-list" className="hover:text-gray-300">
              All List
            </Link>
          </li>
          <li>
            <button className="hover:text-gray-300">Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
