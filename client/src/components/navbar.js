import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">JJFresh</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/login" className="nav-link">Log In</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/edit" className="nav-link">Edit User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/order" className="nav-link">Order</Link>
                        </li>              
                    </ul>
                </div>
            </nav>
        );
    }
}