/**
=========================================================
* Panel Administrativo Transportes Romero
=========================================================
* Basado en Material Tailwind Dashboard React - v2.1.0
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (License incluida en el archivo LICENSE.md)
=========================================================
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "./assets/css/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <App />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);