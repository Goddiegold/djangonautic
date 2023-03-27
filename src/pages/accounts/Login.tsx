import React, { useState, useContext, useEffect } from 'react';
import { login } from "../../services/userService";
import { UserContext, USER_ACTION } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  const { email, password } = user;
  const { userDispatch, user: { userInfo } } = useContext(UserContext);
  const userName = userInfo && userInfo.name
  useEffect(() => {
    if (userName) return navigate("/")
  }, [userName])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    login(user).then(res => {
      console.log(res)
      toast.success(res.data)
      userDispatch({
        type: USER_ACTION.USER_LOGIN,
        payload: res.headers["auth-token"]
      })
      setLoading(false)
      navigate("/")
      console.log(userInfo)
    }).catch(err => {
      console.log(err)
      setLoading(false)
      toast.error(err.response.data)
    })

  };

  return (
    <>
      <h1>Login</h1>
      <form className="site-form" method="post" onSubmit={handleSubmit}>
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          name="email"
          autoFocus
          value={email}
          maxLength={100}
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

        <input type="submit" disabled={loading} value={loading ? "Please wait..." : "Login"} />
      </form>
    </>
  );
}

export default Login;