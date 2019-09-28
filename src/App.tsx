import React from "react";
import { Home } from "./pages/Home";
import Login from "./pages/Login/login";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "./App.scss";

const App: React.FC = () => (
  <div>
    <Router>
    <Switch>
      <Route path="/login" exact  component={Login} />
      <Route path="/"  component={Home} />
    </Switch>
    </Router>
  </div>
);

export default App;
