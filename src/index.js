import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import "react-toastify/dist/ReactToastify.css";
import UserContextProvider from './context/UserContext';
import { debugContextDevtool } from 'react-context-devtool';

const container =   document.getElementById("root");
ReactDOM.render(
  <>
    <BrowserRouter>
    <UserContextProvider>
    <Header/>
      <App/>
    </UserContextProvider>
    </BrowserRouter>
  </>,
container
);

// Attach root container
debugContextDevtool(container, {debugContext:true,debugReducer:true});


// MNMr08hiZpJMsf8n