import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";

import CreateNote from "./components/create-notes.component";
import EditNote from "./components/edit-note.component";
import Notes from "./components/notes.component";

import logo from "./logo192.png";



function App() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">My Notes App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Notes</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Note</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={Notes} />
          <Route path="/edit/:id" component={EditNote} />
          <Route path="/create" component={CreateNote} /> 
        </div>
      </Router>
    );
}

export default App;