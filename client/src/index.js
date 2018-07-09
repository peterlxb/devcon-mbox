import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import countStore from "./stores/CountStore";

import "../styles/index.scss";

ReactDOM.render(
  <BrowserRouter>
    <App state={countStore} />
  </BrowserRouter>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
