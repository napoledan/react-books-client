import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <div className='component-holder'>
      <footer className='footer'>
        <div className='footer-content flex flex-c text-centre'>
        <p>© {new Date().getFullYear()} | Bonsai Books Ltd. All Rights Reserved | Terms and Conditions</p>
        </div>     
      </footer>   
    </div>
  )
}

export default Footer;