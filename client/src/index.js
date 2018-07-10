import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

import * as stores from "./stores";

import "../styles/index.scss";

ReactDOM.render(
  <BrowserRouter>
    <App stores={stores} />
  </BrowserRouter>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
