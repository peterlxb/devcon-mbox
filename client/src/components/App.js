import React, { Component } from "react";
import Counter from "./Counter";

class App extends Component {
  render() {
    console.log(this.props.state);
    return (
      <div className="App">
        <h1>MobX</h1>
        <Counter state={this.props.state} />
      </div>
    );
  }
}

export default App;
