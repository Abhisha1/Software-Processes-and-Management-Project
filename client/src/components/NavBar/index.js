import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignOut from '../Signout';
import './navbar.scss';

const AuthNav = 
<ul className="navbar-nav nav-fill w-100">
<ul className="navbar-nav nav-fill w-50">
    <li className="navbar-item">
        <Link id="linkToHome" to="/home" className="btn btn-outline-primary my-2 my-sm-0">Home</Link>
    </li>
    <li className="navbar-item">
        <Link to="/edit" className="btn btn-outline-primary my-2 my-sm-0">Edit User</Link>
    </li>
    <li className="navbar-item">
        <Link id="linkToOrder" to="/order" className="btn btn-outline-primary my-2 my-sm-0">Order</Link>
    </li>
    </ul>
    <SignOut></SignOut>
</ul>

const AdminNav = <ul className="navbar-nav mr-auto">
<SignOut></SignOut>
</ul>

const UnAuthNavBar = <ul className="navbar-nav mr-auto">
    <li className="navbar-item">
    <Link to="/user" className="btn btn-outline-primary my-2 my-sm-0">Create User</Link>
    </li>
    <li className="navbar-item">
    <Link to="/login" className="btn btn-outline-primary my-2 my-sm-0">Log In</Link>
    </li>

</ul>
function getCookie(name) {
    const value = `; ${document.cookie}`;
    console.log(value);
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


function Navbar() {
    const [isAuth, setAuth] = useState("");
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            if (document.cookie){
                if (getCookie("uId")){
                    setLoading(false);
                    setAuth("Authorised");
                }
                else{
                    setLoading(false);
                    setAuth("Admin");
                }
            }
            else {
                setLoading(false);
                setAuth(null);
            }


        }

        fetchData();
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">JJFresh</Link>
            <div className="collapse navbar-collapse">
                {isLoading ? null :
                    isAuth ? (isAuth === "Authorised" ? AuthNav : AdminNav ) : UnAuthNavBar}
            </div>
        </nav>


    )
}

export default Navbar;