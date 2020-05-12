import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
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
        <Route path="/order" exact component={Order} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/edit" exact component={EditUser}/>
       </div>
    </Router>

  );
}

export default App;
