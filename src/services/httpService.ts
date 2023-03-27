import axios from "axios";
import {toast} from "react-toastify"
import { djangonauticUserToken } from "../context/UserContext";

function log(err) {
  console.log(err);
}

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // Unexpected errors (network down, server down, db down, bug)
  // - Log them
  // - Display generic and friendly error message to user

  if (!expectedError) {
    log(error);
  }
  return Promise.reject(error);
});





const instance = axios.create({
    // baseURL:"/api"
    baseURL:"http://localhost:1000/api"
})

instance.interceptors.request.use(async config=>{
  const token = localStorage.getItem(djangonauticUserToken)
  if(!token) return config; 
  config.headers['auth-token'] = token;
	return config;
})

export default instance;