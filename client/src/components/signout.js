import axios from 'axios';
import React from 'react';

function SignOut(props){

    function clearCookie(){
        axios('https://jjfresh.herokuapp.com/users/signout', {method: "get"})
            .then(res => {
               window.location.pathname('/')
            })
            .catch(err => {
               console.log(err);
            });
    }
    return (
        <form className="form-inline my-2 my-lg-0">
            <button className="btn btn-outline-primary my-2 my-sm-0" onClick={clearCookie()}>Sign Out</button>
        </form>
    )
}

export default SignOut;
