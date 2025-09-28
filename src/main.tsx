//@ts-nocheck
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Router } from 'react-router-dom';

import Home from './comps/Home.tsx';
import Forms from './comps/Forms.tsx';
import DataEntry from "./comps/DataEntry";
import ViewData from "./comps/ViewData";
import ProtectedRoute from './comps/ProtectedRoute.tsx';

const route = createBrowserRouter([
  {
    path : '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Forms formType={"Login"} />
  },
  {
    path: '/register',
    element: <Forms formType={"Register"}/>
  },
  {
    path: "/modifyData",
    element: <><ProtectedRoute><DataEntry /></ProtectedRoute></>
  },
    {
    path: "/viewData",
    element: <><ProtectedRoute><ViewData /></ProtectedRoute></>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
)
