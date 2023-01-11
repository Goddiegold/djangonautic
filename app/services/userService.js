import http from './httpService';

/**get all articles */
export const getAllArticles = async () => await http.get("/articles/")

/**register a new user*/
export const register = async (user) => await http.post("/users/signup", user);


/**login already exisiting user */
export const login = async (user) => await http.post("/users/signin", user);


/***create an article, accessible only to registered and already logged in user */
export const createArticle = async (article) => await http.post("/articles", article, { headers: { 'Content-Type': "multipart/form-data" } })