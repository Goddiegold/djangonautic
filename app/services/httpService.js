import axios from "axios";
import { getToken } from "../utils";


const instance = axios.create({
    baseURL: "http://10.0.2.2:1000/api"
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
  console.log(error);
  }
  return Promise.reject(error);
});

instance.interceptors.request.use(async config=>{
  const token = await getToken()
  if(!token) return config; 
  config.headers['auth-token'] = token;
	return config;
})

export default instance;