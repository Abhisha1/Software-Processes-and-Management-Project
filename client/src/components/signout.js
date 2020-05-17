import axios from 'axios';
import React from 'react';

function SignOut(props){

    function clearCookie(){
        axios('http://localhost:5000/users/signout', {method: "get", withCredentials: true})
            .then(res => {
               props.history.push("/");
               window.location.reload();
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
