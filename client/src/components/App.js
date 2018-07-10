import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { observer } from "mobx-react";

//layout
import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Footer from "./layout/Footer";

//auth
import Register from "./auth/Register";
import Login from "./auth/Login";

class App extends Component {
  render() {
    const { authStore } = this.props.stores;
    console.log(this.props);
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/login"
              render={() => <Login authStore={authStore} />}
            />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
