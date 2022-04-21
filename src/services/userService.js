import http from "./httpService";
import apiUrl from "./config";
import { getCurrentUser} from "./authService";

const apiEndPoint = `${apiUrl}/users`;
const articleEndPoint = `${apiUrl}/articles`;
const user = getCurrentUser();

export function register(user) {
  return http.post(apiEndPoint, user);
}

export function createArticle(article) {
  return http.post(articleEndPoint, {  
    title: article.title,
    body: article.body,
     thumb:article.thumb,
     author: user?.author,
     userId: user?._id,
    })
};