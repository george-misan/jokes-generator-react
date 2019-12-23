import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="nav-wrapper grey darken-3">
    <div className="container">
      <a href="" className="brand-logo">CJ.</a>
      <a href="" className="sidenav-trigger" data-target="mobile-menu">
        <i className="material-icons">menu</i>
      </a>
      <ul className="right hide-on-med-and-down">
        <li><NavLink to="/">Jokes</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      <ul className="sidenav grey lighten-2" id="mobile-menu">
        <li><NavLink to="/">Jokes</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>

    </div>
  </nav>
);

export default Navbar;
