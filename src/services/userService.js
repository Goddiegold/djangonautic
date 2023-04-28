import http from "./httpService";
import jwtDecode from "jwt-decode";

export const getAllArticles = async () => await http.get("/articles/")

export async function register(user) {
  return await http.post("/users/signup", user);
}

export async function login(user) {
  return await http.post("/users/signin", user);
}

export async function createArticle(article, token) {
  return await http.post("/articles", article, { headers: { 'Content-Type': "multipart/form-data" } })
};

export async function getArticle(id) {
  return await http.get(`/articles/${id}`)
}

export function getCurrentUser(token) {
  try {
    if (token) return { ...jwtDecode(token), token }
    else return null;
  }
  catch (ex) {
    console.log(ex)
  }
}