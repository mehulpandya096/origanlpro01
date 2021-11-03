import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav = () => {
  return (
    <div className="sticky-top">
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand">
            <b>CMARIX</b> Admin-Penal
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
