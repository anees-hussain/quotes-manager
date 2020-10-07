import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Dashboard from "./components/dashboard";
import Category from "./components/category";
import Navbar from "./components/navbar";

function App() {
  return (
    // <Router>
    //   <Navbar/>
    // </Router>
    <Router>
      <Switch>
        <Route path="/add-a-category">
          <Category />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
