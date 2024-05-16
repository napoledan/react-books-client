import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../../../public/bonsai-logo.svg';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
const NavBar = () => {
  // State to toggle the navbar
  const [toggleMenu, setToggleMenu] = useState(false);
  // Function to handle the navbar toggler and make it responsive
  const handleNavbar = () => setToggleMenu(!toggleMenu);
  return (
    <nav className='nav-bar' id="navbar">
      <div className='container navbar-content flex'>
        <div className='brand-and-toggler flex flex-sb'>
          <Link to='/' className='navabar-brand flex'>
            <img src={logoImg} alt='main logo' className='mainLogo' />
            <span className='text-uppercase fw-7 fs-24 ls-1'>Bonsai Books</span>
          </Link>
          <button type="button"
          className='navbar-toggler-btn' 
          onClick={handleNavbar}>
            <HiOutlineMenuAlt3 size = {35} style= {{color: toggleMenu ? "#fff" : "#010101"}} />
          </button>
          </div>
          <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link to='/' className='nav-link text-uppercase fs-22 fw-6 ls-1'>Home</Link>
              </li>
              <li className='nav-item'>
                <Link to='about' className='nav-link text-uppercase fs-22 fw-6 ls-1'>About</Link>
              </li>
              <li className='nav-item'>
                <Link to='/contact' className='nav-link text-uppercase fs-22 fw-6 ls-1'>Contact</Link>
              </li>
            </ul>
            </div>
          </div>
    </nav>
  );
}

export default NavBar;
