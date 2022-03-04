import React, { useState } from 'react';
import { login, getCurrentUser } from "../../services/authService";


const Login  = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

   const handleChange = ({currentTarget}) => {
     const logUser = { ...user };
     logUser[currentTarget.name] = currentTarget.value;
     setUser(logUser);
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       await login(user)
       window.location = '/';
     } catch (ex) {
       console.log(ex);
     }
    
  };

  const loggedUser = getCurrentUser();
  if (loggedUser) return location.pathname = '/';
  else return (
      <>
        <h1>Login</h1>
        <form className="site-form" method="post" onSubmit={handleSubmit}>
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            name="email"
            autoFocus
            value={email}
            maxLength={150}
            minLength={5}
            required
            id="email"
            onChange={handleChange}
          />
          <label htmlFor="id_password">Password:</label>
          <input
            type="password"
            name="password"
            required
            value={password}
            id="password"
            onChange={handleChange}
          />

          <input type="submit" value="Login"/>
        </form>
      </>
    );
}
 
export default Login;