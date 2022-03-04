import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginWithJwt,getCurrentUser } from "../../services/authService";
import { register } from './../../services/userService';


const Signup = (props) => {
  const [user, setUser] = useState({
    author: "",
    email: "",
    password: "",
  });

  const loggedUser = getCurrentUser();

  const handleChange = ({ target }) => {
    const newUser = { ...user };
    newUser[target.name] = target.value;
    setUser(newUser);
  };

  const { author, email, password } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    register(user).then(({ token }) => {
      console.log(token)
      loginWithJwt(token);
      location.pathname='/'
    })
    
      .fail(err => {
        if (err && err.status === 400) {
          toast(err.responseText);
      }
       console.log(err);
    });
  };

  if (loggedUser) return (location.pathname = "/");
  else
    return (
      <>
        <h1>Signup</h1>
        <form className="site-form" onSubmit={handleSubmit}>
          <br />
          <label htmlFor="id_username">Username:</label>
          <input
            style={{ marginTop: 10 }}
            type="text"
            name="author"
            minLength={5}
            maxLength={50}
            autoFocus
            required
            value={author}
            id="username"
            onChange={handleChange}
          />
          <br />

          <label htmlFor="id_username">Email:</label>
          <input
            style={{ marginTop: 10 }}
            type="email"
            name="email"
            id="email"
            minLength={5}
            maxLength={100}
            required
            value={email}
            onChange={handleChange}
          />
          <br />

          <label htmlFor="password1">Password:</label>
          <input
            style={{ marginTop: 10 }}
            type="password"
            name="password"
            maxLength={10}
            minLength={5}
            required
            id="password"
            value={password}
            onChange={handleChange}
          />
          <input type="submit" value="Signup" id="signup"/>
        </form>
      </>
    );
};

export default Signup;
