import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import counterState from "./stores/CountStore";

ReactDOM.render(
  <App state={counterState} />,

  document.getElementById("root")
);
