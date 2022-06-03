import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <Routes />
  </React.StrictMode>
);
