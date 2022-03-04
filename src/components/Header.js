import React from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";


const Header = () => {
  const user = getCurrentUser();
  return (
    <header className="wrapper">
      <h1>
        <Link to="*">
          <img src={logo} alt="djangonautic" />
        </Link>
      </h1>

      <nav>
        <ul>
          {user ? (
            <>
              <li className="welcome_user">
                Welcome {user.author}
              </li>

              <li>
                <Link to="/create/article" className="highlight" id="new_article">
                  New Article
                </Link>
              </li>

              <li>
                <Link to="/accounts/logout">
                  Logout
                 </Link>
              </li>
            </>
          ) : (
            <>
              <Link to="/accounts/login" style={{ marginRight: 20 }} id="login">
                Login
              </Link>

              <Link to="/accounts/signup" id="signup">Signup</Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
