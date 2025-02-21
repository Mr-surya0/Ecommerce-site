import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import './footer.css'; 

export default function Banner() {
  return (
    <div className='containerFooter'>
      <footer>
        <div className="footer-content">
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="icon facebook">Facebook</a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="icon twitter">Twitter</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="icon instagram">Instagram</a>
          </div>


          <div className="footerMenu">

            <a class="menu__link" href="#">Home</a>
            <a class="menu__link" href="#">Shop</a>
            <a class="menu__link" href="#">Brands</a>
            <a class="menu__link" href="#">Contact</a>
          </div>
          <div className="copyright">
            &copy; 2023 Your Company. All rights reserved.
          </div>
        </div>

      </footer>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="waves">
          <use href="#gentle-wave" x="50" y="0" fill="#0ea0ff" fillOpacity=".2" />
          <use href="#gentle-wave" x="50" y="3" fill="#0ea0ff" fillOpacity=".5" />
          <use href="#gentle-wave" x="50" y="6" fill="#0ea0ff" fillOpacity=".9" />
        </g>
      </svg>
    </div>

  );
}
