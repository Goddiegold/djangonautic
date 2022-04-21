import React from 'react';  
import './App.css';
import { Routes, Route} from "react-router-dom";
import ArticleCreate from './components/articles/ArticleCreate';
import ArticleList from './components/articles/ArticleList';
import ArticleDetail from './components/articles/ArticleDetail';
import Signup from './components/accounts/Signup';
import Login from './components/accounts/Login';
import Logout from './components/accounts/Logout';
import { ToastContainer } from "react-toastify";
import { articles } from './utils/articles';


const App = () => {

  return (
    <div className="wrapper">
      <ToastContainer />
      <Routes>
        <Route path="*" exact element={<ArticleList articles={articles} />} />

        <Route
          path="/create/article"
          exact
          element={<ArticleCreate articles={articles} />}
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
