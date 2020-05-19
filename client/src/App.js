import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/NavBar";
import PrivateRoute from "./components/protectedRoutes";
import CreateUser from "./components/createUser";
import Order from "./components/order";
import Login from "./components/login";
import Home from "./components/home";
import EditUser from "./components/edit-user";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/user" exact component={CreateUser} />
        <PrivateRoute path="/order" component={Order} exact={true} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/home" component={Home} exact={true} />
        <PrivateRoute path="/edit" component={EditUser} exact={true} />
       </div>
    </Router>

  );
}

export default App;
