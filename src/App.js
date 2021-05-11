import React, { Component } from 'react';
import HomeContainer from './components/home/index';
import Navbar from './components/utilities/nav';
import Display_Sidebar from './components/utilities/sidenav';
import './components/utilities/side_nav_style.css';
import Login from './containers/Login';
import Register from './containers/Register';
import { useSelector } from 'react-redux';
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import Performance_Graph from './components/home/performance';
import ProfileContainer from './components/profile/index';

function PrivateRoutes() {
  return (
    
    <>
    <Container fluid>
      <Row>
        <Navbar />
      </Row>
      <Row>
        <Col xs={2} id="sidebar-wrapper">      
          <Display_Sidebar />
        </Col>
        <Col  md={10} id="page-content-wrapper">
          <Container className="Content-Container">
            <Row className="Content-Row-Performance">
              <Performance_Graph/>
            </Row>
            <Row className="Content-Row-Main">
        <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={HomeContainer} />
        <Route path="/:username" component={ProfileContainer} />
      </Switch>
      </Row>
      </Container>
      </Col> 
      
        </Row>
      </Container>
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
      <Route exact path="/register" component={Register} />
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