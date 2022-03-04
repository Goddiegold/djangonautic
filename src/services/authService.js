import http from "./httpService";
import apiUrl from "./config";
import jwtDecode from "jwt-decode";
import $ from 'jquery';

const apiEndPoint = `${apiUrl}/auth`;
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(user) {
    const jwt = await http.post(apiEndPoint, user);
    sessionStorage.setItem(tokenKey, jwt);
}

export function logout() {
  sessionStorage.removeItem(tokenKey);
}

export function loginWithJwt(jwt) {
  sessionStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = sessionStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return sessionStorage.getItem(tokenKey);
}
