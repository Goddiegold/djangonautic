import React, { useContext, useEffect, useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { UserContext, USER_LOGOUT } from "../context/UserContext";



const Header = () => {
  const {user,userDispatch} = useContext(UserContext);


  function logout(){
    userDispatch({
      type:USER_LOGOUT
    })
  }

  // const user = {author:""}
console.log(user)
  return (
    <header className="wrapper">
      <h1>
        <Link to="*">
          <img src={logo} alt="djangonautic" />
        </Link>
      </h1>

      <nav>
        <ul>
          {user && user.name?.length>1 ? (
            <>
              <li className="welcome_user">
                Welcome {user.name}
              </li>

              <li>
                <Link to="/create/article" className="highlight" id="new_article">
                  New Article
                </Link>
              </li>

              <li>
                <Link to="/" onClick={logout}>
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
