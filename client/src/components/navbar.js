import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignOut from './signout';

const AuthNav = <ul className="navbar-nav mr-auto">
    <li className="navbar-item">
        <Link to="/home" className="nav-link">Home</Link>
    </li>
    <li className="navbar-item">
        <Link to="/edit" className="nav-link">Edit User</Link>
    </li>
    <li className="navbar-item">
        <Link to="/order" className="nav-link">Order</Link>
    </li>
    <SignOut></SignOut>
</ul>

const AdminNav = <ul className="navbar-nav mr-auto">
<SignOut></SignOut>
</ul>

const UnAuthNavBar = <ul className="navbar-nav mr-auto">
    <li className="navbar-item">
        <Link to="/user" className="nav-link">Create User</Link>
    </li>
    <li className="navbar-item">
        <Link to="/login" className="nav-link">Log In</Link>
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
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">JJFresh</Link>
            <div className="collapse navbar-collapse">
                {isLoading ? null :
                    isAuth ? (isAuth === "Authorised" ? AuthNav : AdminNav ) : UnAuthNavBar}
            </div>
        </nav>


    )
}

export default Navbar;