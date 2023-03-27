import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { UserContext, USER_ACTION } from "../../context/UserContext";
import { register } from '../../services/userService';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const { userDispatch, user: { userInfo } } = useContext(UserContext);

  const userName = userInfo && userInfo.name
  useEffect(() => {
    if (userName) return navigate("/")
    console.log(userInfo)
  }, [])

  const handleChange = (event: any) => setUser({ ...user, [event.target.name]: event.target.value });

  const { name, email, password } = user;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    register(user).then(res => {
      console.log(res)
      toast.success(res.data)
      userDispatch({
        type: USER_ACTION.USER_LOGIN,
        payload: res.headers["auth-token"]
      })
      setLoading(false)
      navigate("/")
    }).catch(err => {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data)
    });
  };



  return (
    <>
      <h1>Signup</h1>
      <form className="site-form" onSubmit={handleSubmit}>
        <br />
        <label htmlFor="id_username">Username:</label>
        <input
          style={{ marginTop: 10 }}
          type="text"
          name="name"
          minLength={5}
          maxLength={50}
          autoFocus
          required
          value={name}
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
        <input type="submit" disabled={loading} value={loading ? "Please wait..." : "Signup"} />
      </form>
    </>
  );
};

export default Signup;
