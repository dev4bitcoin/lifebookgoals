import React from "react";

const Footer = () => {
  return (
    <div className="container">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link" href="/privacy">
            Privacy policy
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/contact">
            Contact
          </a>
        </li>
      </ul>
      <div className="copy">
        &copy; LifeBookGoals 2020
        <br />
        All rights reserved
      </div>
    </div>
  );
};

export default Footer;
