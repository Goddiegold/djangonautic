import axios from "axios";
import { toast } from "react-toastify"
import { djangonauticUserToken } from "@/context/UserContext";

function log(err) {
  console.log(err);
}

const instance = axios.create({
  //baseURL:"http://localhost:1000/api"
  // baseURL:"/api"
 baseURL: "https://djangonautic-react.onrender.com/api"
})

instance.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // Unexpected errors (network down, server down, db down, bug)
  // - Log them
  // - Display generic and friendly error message to user

  if (!expectedError) {
    log(error);
   // toast.error('Something went wrong!')
  }
  return Promise.reject(error);
});

instance.interceptors.request.use(config => {
  if (typeof window === "undefined") return config
  const token = window.localStorage.getItem(djangonauticUserToken)
  if (!token) return config;
  config.headers['auth-token'] = token;
  return config;
})



export default instance;