import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import ReactDOM from "react-dom/client";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Report from "./components/Report.jsx";


// import dom
import { createBrowserRouter,Router,RouterProvider } from "react-router-dom";


const router = createBrowserRouter ([
  {
    path: "*",
    element: <div> 404 </div>
  },
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/report",
    element: <Report/>
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
