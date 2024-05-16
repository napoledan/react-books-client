import React from 'react';
import Navbar from '../Navbar/Navbar';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';

const Header = () => {
  return (
    <div className='component-holder'>
      <header className='header'>
        <Navbar />
        <div className='header-content flex flex-c text-white'>
          <h2 className='header-title text-capitalize'>Find your zen in these pages</h2>
          <br />
          <p className='header-text'>Join our community of passionate readers and celebrate the joy of reading. <br/>Don't miss out on the adventure and become a part of our community today!</p>
          <SearchForm />
        </div>     
      </header>   
    </div>
  )
}

export default Header;