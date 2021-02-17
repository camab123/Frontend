import React, { Component } from 'react';
import HomeContainer from './components/home/index';
import Navbar from './components/utilities/nav';
import Login from './containers/Login';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function PrivateRoutes() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={HomeContainer} />
      </Switch>
    </>
  );
}

function PublicRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}

function App() {
  const authenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Router>
      { authenticated ? <PrivateRoutes /> : <PublicRoutes /> }
    </Router>
  );
}

export default App;