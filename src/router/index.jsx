import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from '../pages/Home'
import Layout from "../pages/layouts/Layout";
import BookForm from "../pages/BookForm";
import Search from "../pages/Search";
import BookDetails from "../pages/BookDetail";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import React, { useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function index() {

let {authReady,user}=useContext(AuthContext);

const isAuthenticated=!!user;

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children : [
      {
        path :  "",
        element : isAuthenticated ? <Home/> : <Navigate to="/login"/>
      },
      {
        path :  "/books/:id",
        element : isAuthenticated ? <BookDetails/> : <Navigate to="/login"/>
      },
      {
        path :  "/create",
        element : isAuthenticated ? <BookForm/> : <Navigate to="/login"/>
      },
      {
        path :  "/edit/:id",
        element : isAuthenticated ? <BookForm/> : <Navigate to="/login"/>
      },
      {
        path :  "/search",
        element : isAuthenticated ? <Search/> : <Navigate to="/login"/>
      },
      {
        path :  "/register",
        element : !isAuthenticated ? <Register/> : <Navigate to="/"/>
      },
      {
        path :  "/login",
        element : !isAuthenticated ? <Login/> : <Navigate to="/"/>
      }
    ]
  },
]);

  return (
    authReady && <RouterProvider router={router} />
  )
}
