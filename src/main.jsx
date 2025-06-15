import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'

import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Home from './Pages/Home.jsx'
import Nivel from './Pages/Nivel.jsx'
import Mapa from './Pages/Mapa.jsx'

const router = createBrowserRouter([
 {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/nivel/:id',
    element: <Nivel />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/mapa',
    element: <Mapa />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
