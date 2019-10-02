import React from "react";
import Home from "./pages/Home/home";
import { IntlProvider } from "react-intl";
import Login from "./pages/Login/login";
import { createStore, combineReducers } from "redux";
import { balanceReducer } from "./store/balanceReducer";
import { langReducer } from "./store/langReducer";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";

const store = createStore(combineReducers({ balanceReducer, langReducer }));

const App: React.FC = () => (
  <IntlProvider
    locale="en"
    messages={{
      a: "a"
    }}
  >
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </Provider>
  </IntlProvider>
);

export default App;
