import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserContext, USER_LOGOUT } from "../context/UserContext";
import styles from "@/styles/App.module.css"



const Header = () => {
  const { user, userDispatch } = useContext(UserContext);
  const [name, setName] = useState("Doe")
  const [hydrate, setHydrated] = useState(false)

  useEffect(() => setHydrated(true), [])

  // useEffect(() => {
  //   if (!user?.userInfo?.name) return
  //   setName(user.userInfo.name)
  // }, [user?.userInfo?.name])


  const logout = () => userDispatch({ type: USER_LOGOUT })

  // const user = {author:""}
  console.log(user)
  if (!hydrate) return null
  return (
    <header className="wrapper">

      <Link href="/">
        <Image src="/img/logo.png" alt="djangonautic" width={150} height={30} />
      </Link>

      <nav>
        <ul>
          {user.userInfo && user.userInfo.name?.length > 1 ? (
            <>
              <li className="welcome_user">
                {/* Welcome {name} */}
                Welcome {user.userInfo.name}
              </li>

              <li>
                <Link href="/articles/create" className={styles.highlight} id="new_article">
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
