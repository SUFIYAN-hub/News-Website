import "./Navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <img className="logo" src={logo} alt="Civitas Times" />
        <div className="brand">Civitas Times</div>
        <button
          className="menu-toggle"
          onClick={() => {
            const navList = document.querySelector(".nav-list");
            navList.classList.toggle("active");
          }}
        >
          ☰
        </button>

        <ul className="nav-list">
          <li className="nav-btn">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-btn">
            <Link className="link" to="/world">
              World
            </Link>
          </li>
          <li className="nav-btn">
            <Link className="link" to="/entertainment">
              Entertainment
            </Link>
          </li>
          <li className="nav-btn">
            <Link className="link" to="/health">
              Health
            </Link>
          </li>
          <li className="nav-btn">
            <Link className="link" to="/technology">
              Technology
            </Link>
          </li>
          <li className="nav-btn">
            <Link className="link" to="/sports">
              Sports
            </Link>
          </li>
          <li className="nav-btn">
            <Link className="link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
