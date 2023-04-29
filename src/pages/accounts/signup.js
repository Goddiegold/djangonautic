import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { USER_LOGIN, UserContext } from "@/context/UserContext";
import { register } from '@/services/userService';
import styles from "@/styles/App.module.css"
import { useRouter } from "next/router";
import ProtectRoute from "@/components/ProtectRoute";

const Signup = (props) => {
  const router = useRouter()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {userDispatch}  = useContext(UserContext)

  const [loading, setLoading] = useState(false);

  const handleChange = ({ currentTarget }) => setUser({ ...user, [currentTarget.name]: currentTarget.value });

  const { name, email, password } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    register(user).then(res => {
      console.log(res)
      toast.success(res.data)
      userDispatch({
        type: USER_LOGIN,
        payload: res.headers["auth-token"]
      })
      setLoading(false)
      router.push("/")
    }).catch(err => {
      console.log(err);
      setLoading(false);
      toast.error(err?.response?.data)
    });
  };



  return (
    <ProtectRoute>
      <h1>Signup</h1>
      <form className={styles.site_form} onSubmit={handleSubmit}>
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
    </ProtectRoute>
  );
};

export default Signup;
