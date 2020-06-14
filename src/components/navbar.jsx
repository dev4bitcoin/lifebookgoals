import React from "react";
import Search from "./search";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white absolute-top">
      <div className="container">
        <button
          className="navbar-toggler order-2 order-md-1"
          type="button"
          data-toggle="collapse"
          data-target=".navbar-collapse"
          aria-controls="navbar-left navbar-right"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse order-3 order-md-2"
          id="navbar-left"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/home" id="homeLink">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/archives" id="archivesLink">
                Archives
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact" id="contactLink">
                Contact
              </a>
            </li>
            {user && (
              <React.Fragment>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="postLink"
                    href="/"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Posts
                  </a>
                  <div className="dropdown-menu" aria-labelledby="postLink">
                    <a className="dropdown-item" href="/postArticle/new">
                      Add New Post
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="tagsLink" href="/tagManagement">
                    Tags
                  </a>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>

        <a className="navbar-brand mx-auto order-1 order-md-3" href="/home">
          LifeBookGoals
        </a>

        <div
          className="collapse navbar-collapse order-4 order-md-4"
          id="navbar-right"
        >
          <ul className="navbar-nav ml-auto">
            {user && (
              <React.Fragment>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="loginName"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Hi, {user.name}
                  </a>
                  <div className="dropdown-menu" aria-labelledby="loginName">
                    <a className="dropdown-item" href="/logout">
                      Logout
                    </a>
                  </div>
                </li>
              </React.Fragment>
            )}
          </ul>
          <form className="form-inline" role="search">
            <Search></Search>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
