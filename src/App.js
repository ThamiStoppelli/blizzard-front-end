import React from 'react';
import Paths from "./routes";
import "./global.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
        <ToastContainer className="toast-style" autoClose={4000} position="top-right" />
        <Paths />
    </BrowserRouter>
  );
}