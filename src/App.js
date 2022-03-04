import React,{useState,useEffect} from 'react';  
import './App.css';
import { Routes, Route, useNavigate} from "react-router-dom";
import ArticleCreate from './components/articles/ArticleCreate';
import ArticleList from './components/articles/ArticleList';
import ArticleDetail from './components/articles/ArticleDetail';
import  defaultThumb  from './img/default.png';
import Signup from './components/accounts/Signup';
import Login from './components/accounts/Login';
import Logout from './components/accounts/Logout';
import { ToastContainer } from "react-toastify";
import { getCurrentUser } from './services/authService';



const App = () => {
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   const user = getCurrentUser();
  //   console.log(user)
  //   setUser(user);
  // }, []);

    // const c_user = getCurrentUser();
    // console.log(c_user)
    // setUser({user:c_user});

  const [articles, setArticles] = useState([
    {
      _id: 1,
      title: "Article1",
      body: "body1 body1 body1 body1 body1",
      thumb: defaultThumb,
      author: getCurrentUser()?.author,
      // author: "author1",
      slug: "article1",
      date: "date",
    },
    {
      _id: 2,
      title: "Article2",
      body: "body2 body2 body2 body2 body2",
      thumb: defaultThumb,
      slug: "article2",
      author: "author2",
      date: "date",
    },
    {
      _id: 3,
      title: "Article3",
      body: "body3 body3 body3 body3 body3",
      thumb: defaultThumb,
      slug: "article3",
      author: "author3",
      date: "date",
    },
  ]);

  return (
    <div className="wrapper">
      <ToastContainer />
      <Routes>
        <Route path="*" exact element={<ArticleList articles={articles} />} />

        <Route
          path="/create/article"
          exact
          element={<ArticleCreate articles={articles}/>}
        />

        <Route
          path="/articles/:slug/:id"
          exact
          element={<ArticleDetail articles={articles} />}
        />

        <Route path="/accounts/signup" exact element={<Signup />} />

        <Route path="/accounts/login" exact element={<Login />} />

        <Route path="/accounts/logout" exact element={<Logout />} />
      </Routes>
    </div>
  );
}
 
export default App;
