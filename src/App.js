import React from "react";
import { Route, NavLink } from "react-router-dom";

import Home from "./components/Home";
import Form from "./components/Form";
import Success from "./components/Success";

import "./App.css";

const App = () => {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/pizza">Order Now!</NavLink>
      </nav>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/pizza">
        <Form />
      </Route>
      <Route path="/success">
        <Success />
      </Route>
    </>
  );
};
export default App;
