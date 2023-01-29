import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./app";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
