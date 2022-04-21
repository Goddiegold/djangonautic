import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <>
    <BrowserRouter>
      <Header/>
      <App/>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);


// MNMr08hiZpJMsf8n