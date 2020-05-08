import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import CreateUser from "./components/createUser";
import ProductForm from './components/productForm';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/user" exact component={CreateUser} />
        <Route path="/order" exact component={ProductForm} />
      </div>
    </Router>

  );
}

export default App;
