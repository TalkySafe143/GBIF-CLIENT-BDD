import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignIn from './components/SignIn';
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider, redirect, Navigate} from 'react-router-dom';
import Profile from "./components/Profile";
import Queries from "./components/Queries";

const routes = [
    {
        path: '/',
        element: <Navigate to={'/sign-in'}/>
    },
    {
        path: "/sign-in",
        element: <SignIn />
    },
    {
        path: '/sign-up',
        element: <SignUp />
    },
    {
        path:'/home',
        element: <Home />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/queries',
        element: <Queries />
    }
]

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}  />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
