import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => (
  <footer>
    <ul>
      <li><a href="#">Privacy Policy</a></li>
      <li><a href="#">Terms of Service</a></li>
    </ul>
    <div className="social-icons">
      {/* <a href="#"><img src="images/Logo/Facebook.png" alt="Facebook" style={{ width: '40px', height: '30px' }} /></a>
      <a href="#"><img src="images/Logo/x.png" alt="Twitter" style={{ width: '25px', height: '25px' }} /></a>
      <a href="#"><img src="images/Logo/instagram.png" alt="Instagram" style={{ width: '30px', height: '30px' }} /></a> */}
      <FaFacebook />
      <FaTwitter />
      <FaInstagram />
    </div>
    <p>&copy; 2024 Programming Education. All rights reserved.</p>
  </footer>
);

export default Footer;
