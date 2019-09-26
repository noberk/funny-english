import React from "react";
import { Home } from "./pages/Home";
import Login from "./pages/Login/login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";

const App: React.FC = () => (
  <div>
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
    </Router>
  </div>
);

export default App;
