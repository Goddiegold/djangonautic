import axios from "axios";
import {toast} from "react-toastify"

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
    baseURL:"http://localhost:1000/api"
})

export default instance;