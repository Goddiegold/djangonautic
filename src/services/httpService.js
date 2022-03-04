import { toast } from "react-toastify";
import log from "./logService";
import $ from "jquery";

$.ajaxSetup({
  beforeSend: function (xhr) {
    xhr.fail((err) => {
      const expectedError = err && err.status >= 400 && err.status < 500;
      if (!expectedError) {
        log(err);
        toast("An unexpected error occurred");
      }
      return Promise.reject(err);
    });
  },
});

function setJwt(jwt) {
  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("x-auth-token", jwt);
    },
  });
}

let http = {
  get: $.get,
  post: $.post,
  put: $.ajax,
  delete: $.ajax,
  setJwt
};

export default http;
