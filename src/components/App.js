import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { SignIn } from "./";

function Home() {
  return <div>Home page</div>;
}

function About() {
  return <div>About Page</div>;
}

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;
