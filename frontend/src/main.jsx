

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // enables dropdowns, modals, etc.
import 'bootstrap-icons/font/bootstrap-icons.css';  // optional icons

import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="top-right" />
    </Provider>
  </React.StrictMode>
);
