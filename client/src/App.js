import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
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
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/edit" exact compenent={EditUser}/>
       </div>
    </Router>

  );
}

export default App;
