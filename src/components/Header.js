import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserContext, USER_LOGOUT } from "../context/UserContext";



const Header = () => {
  const { user, userDispatch } = useContext(UserContext);


  function logout() {
    userDispatch({
      type: USER_LOGOUT
    })
  }

  // const user = {author:""}
  console.log(user)
  return (
    <header className="wrapper">
      <h1>
        <Link href="/">
          <Image src="/img/logo.png" alt="djangonautic" width={150} height={30} />
        </Link>
      </h1>

      <nav>
        <ul>
          {user.userInfo && user.userInfo.name?.length > 1 ? (
            <>
              <li className="welcome_user">
                Welcome {user.userInfo.name}
              </li>

              <li>
                <Link href="/create/article" className="highlight" id="new_article">
                  New Article
                </Link>
              </li>

              <li>
                <Link href="/" onClick={logout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/accounts/login" style={{ marginRight: 20 }} id="login">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/accounts/signup" id="signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
