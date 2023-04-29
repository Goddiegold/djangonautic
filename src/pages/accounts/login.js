import React, { useContext, useState} from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { USER_LOGIN, UserContext } from '@/context/UserContext';
import { login } from "@/services/userService";
import ProtectRoute from '@/components/ProtectRoute';

import styles from '@/styles/App.module.css'

const Login = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  const {userDispatch}  = useContext(UserContext)

  const [loading, setLoading] = useState(false);

  const { email, password } = user;


  const handleChange = ({ currentTarget }) => setUser({ ...user, [currentTarget.name]: currentTarget.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    login(user).then(res => {
      console.log(res)
      setLoading(false)
      toast.success(res.data)
      userDispatch({
        type: USER_LOGIN,
        payload: res.headers["auth-token"]
      })
      router.push("/")
      
  
      // navigate("/")
    }).catch(err => {
      console.log(err)
      setLoading(false)
      toast.error(err?.response?.data)
    })

  };

  return (
    <ProtectRoute>
      <h1>Login</h1>
      <form className={styles.site_form} method="post" onSubmit={handleSubmit}>
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
     </ProtectRoute>
  );
}

export default Login;