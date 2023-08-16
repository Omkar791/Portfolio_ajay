import React from 'react'
import { useState } from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import hackerIcon from '../assets/hacker_logo.png'



const Navbar = () => {

  const [navbarActive, setNavbarActive] = useState(false);

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
  };
  



  return (
    // <div className='nav'>
    //     <div className='header'>
    //       <h1 className='nav-logo'>Ajay Magar </h1>

    //       <ul className='nav-menu'>
    //           <li>
    //             <NavLink to="/">About</NavLink>
    //           </li>
    //           <li>
    //             <NavLink to="/blogs">Blogs</NavLink>
    //           </li> 
    //           <li>
    //             <NavLink to="/fame">Hall of Fame</NavLink>
    //           </li> 
    //       </ul>
    //     </div>
    //   <div className='nav-hr' />
    // </div>

    // new nav
    <div>

      <div class="navbar">
        <div className="navbar-left">
          <h1>Ajay Magar</h1>
        </div>
        <div className="navbar-right">
          <div className="hamburger" onClick={toggleNavbar}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <ul className={`navbar-links ${navbarActive ? 'active' : ''}`}>
            <li><NavLink to="/">About</NavLink></li>
            <li> <NavLink to="/blogs">Blogs</NavLink></li>
            <li><NavLink to="/fame">Hall of Fame</NavLink></li>
          </ul>
        </div>
      </div>
      <div className='nav-hr' />
    </div>
    
   
  );
}
    


export default Navbar