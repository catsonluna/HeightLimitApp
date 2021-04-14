import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

//pages
import MainPage from "./pages"
import Error from "./pages/404"
import Settings from "./pages/Settings"
import CurrentMap from "./pages/CurrentMap"
import AllMaps from "./pages/AllMaps"
import Stats from "./pages/Stats"

export default function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={MainPage}/>
      <Route exact path="/currentmap" component={CurrentMap}/>
      <Route exact path="/allmaps" component={AllMaps}/>
      <Route exact path="/settings" component={Settings}/>
      <Route exact path="/stats" component={Stats}/>
      <Route component={Error} />
      </Switch>
    </Router>
  );
}
