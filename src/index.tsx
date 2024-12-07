import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import { setupServer } from "./mirage/employee-server";
import { DEFAULT_EMPLOYEE } from "./utils/constants";
import App from "./App";
import "./index.css";
import "./index.css";

setupServer(DEFAULT_EMPLOYEE);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
