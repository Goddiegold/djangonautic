import http from "./httpService";
import jwtDecode from "jwt-decode";

type UserFormType = {
  name?: string,
  email: string,
  password: string
}

export type ArticleType = {
  title: string,
  thumb: any,
  body: string
}

export const getAllArticles = async () => await http.get("/articles/")

export const register = async (user: UserFormType) => await http.post("/users/signup", user);

export const login = async (user: UserFormType) => await http.post("/users/signin", user)

export const createArticle = async (article: ArticleType) => await http.post("/articles", article, { headers: { 'Content-Type': "multipart/form-data", } })

export const getArticle = async (id: string) => await http.get(`/articles/${id}`)

export const getCurrentUser = (token: string) => {
  try {
    if (token) return { ...jwtDecode(token), token }
    else return null;
  }
  catch (ex) {
    console.log(ex)
  }
}