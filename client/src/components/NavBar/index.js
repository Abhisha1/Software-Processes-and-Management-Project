import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignOut from '../Signout';
import './navbar.scss';

const AuthNav = 
<ul className="navbar-nav nav-fill w-100">
<ul className="navbar-nav nav-fill w-50">
    <li className="navbar-item">
        <a href="/edit" className="btn btn-outline-primary my-2 my-sm-0">Edit User</a>
    </li>
    <li className="navbar-item">
        <a href="/order" className="btn btn-outline-primary my-2 my-sm-0">Order</a>
    </li>
    </ul>
    <SignOut></SignOut>
</ul>

const UnAuthNavBar = <ul className="navbar-nav nav-fill w-50">
    <li className="navbar-item">
    <a href="/user" className="btn btn-outline-primary my-2 my-sm-0">Create User</a>
    </li>
    <li className="navbar-item">
    <a href="/login" className="btn btn-outline-primary my-2 my-sm-0">Log In</a>
    </li>

</ul>


function Navbar() {
    const [isAuth, setAuth] = useState(true);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        async function fetchData() {

            if (!document.cookie) {
                setLoading(false);
                setAuth(null);
            }
            else {
                setLoading(false);
                setAuth("Authorised");
            }


        }

        fetchData();
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">JJFresh</Link>
            <div className="collapse navbar-collapse">
                {isLoading ? null :
                    isAuth ? AuthNav : UnAuthNavBar}
            </div>
        </nav>


    )
}

export default Navbar;