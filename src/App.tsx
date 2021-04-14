import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

//pages
import MainPage from "./pages"
import error from "./pages/404"
import Settings from "./pages/Settings"

export default function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={MainPage}/>
      <Route exact path="/settings" component={Settings}/>
      <Route component={error} />
      </Switch>
    </Router>
  );
}
