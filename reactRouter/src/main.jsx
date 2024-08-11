import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, Route,createBrowserRouter,createRoutesFromElements } from "react-router-dom";
import Layout from "./Layout.jsx";
import { Home, About, Contact,User,Github,GithubInfoLoader } from "./components/index.js";

/*const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "about",
        element: <About />
      }
    ]
  }
]);*/

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route 
        loader={GithubInfoLoader}
        path="/github" element={<Github/>}></Route>
        <Route path="/user/:userId" element={<User/>}></Route>
      </Route>
    )
  )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);