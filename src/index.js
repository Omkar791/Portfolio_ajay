import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Blogs from './components/Blogs';
// import NucleiBlog from './components/BlogPages/1NucleiBlogPage/NucleiBlog';
import NucleiBlog from './components/BlogPages/1NucleiBlogPage/NucleiBlog';
import HallOfFame from './components/HallOfFame';
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
import HuntHacker from './components/BlogPages/2HuntHacker/HuntHacker';
import AccountTakeover from './components/BlogPages/3AccountTakeover/AccountTakeover';
import DjangoDebug from './components/BlogPages/5DjangoDebug/DjangoDebug'
import AccountPentesting from './components/BlogPages/4AccountPentest/AccountPentesting';
import DomainTakeover from './components/BlogPages/6DomainTakeover/DomainTakeover';
import S3Leaking from './components/BlogPages/7S3Leaking/S3Leaking';
import JioMart from './components/8JioMart/JioMart';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";







const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "blogs",
    element: <Blogs />,
  },

  {
    path: "nuclei",
    element: <NucleiBlog />,
  },
  {
    path: "fame",
    element: <HallOfFame />,
  },
  {
    path: "hunt",
    element: <HuntHacker />,
  },
  {
    path: "takeover",
    element: <AccountTakeover />,
  },
  {
    path: "pentest",
    element: <AccountPentesting />,
  },
  {
    path: "djangoDebug",
    element: <DjangoDebug />,
  },
  {
    path: "domainTakeover",
    element: <DomainTakeover />,
  },
  {
    path: "S3",
    element: <S3Leaking />,
  },
  {
    path: "jioMart",
    element: <JioMart />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
  
);


