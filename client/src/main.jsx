import App from "./App.jsx";
import { StrictMode } from "react";
import { CssBaseline } from "@mui/material";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <>
    <CssBaseline />
    <App />
  </>
);
