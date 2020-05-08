import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import Box from "./components/box.component";
import ProductForm from './components/productForm.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/user" exact component={CreateUser} />
        <Route path="/box" exact component={Box} />
        <Route path="/products" exact component={ProductForm} />
      </div>
    </Router>

  );
}

export default App;
