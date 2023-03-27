import React, { useContext, useEffect, useState } from 'react';  
import './App.css';
import { Routes, Route} from "react-router-dom";
import ArticleCreate from './pages/articles/ArticleCreate';
import ArticleList from './pages/articles/ArticleList';
import ArticleDetail from './pages/articles/ArticleDetail';
import Signup from './pages/accounts/Signup';
import Login from './pages/accounts/Login';
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <div className="wrapper">
      <ToastContainer />
      <Routes>
      <Route path="*" element={<ArticleList />} />
        <Route path="/" exact element={<ArticleList/>} />

        <Route
          path="/create/article"
          exact
          element={<ArticleCreate/>}
        />

        <Route
          path="/articles/:slug/:id"
          exact
          element={<ArticleDetail />}
        />

        <Route path="/accounts/signup" exact element={<Signup />} />

        <Route path="/accounts/login" exact element={<Login />} />
      </Routes>
    </div>
  );
}
 
export default App;
