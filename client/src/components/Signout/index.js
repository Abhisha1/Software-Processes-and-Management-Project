import React from 'react';
import './signout.scss'

function clearCookie(){
    document.cookie = "authorised=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "uId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // window.location.reload();
}
function SignOut(){
    return (
        <form className="form-inline my-2 my-lg-0">
            <button id="signout" className="btn btn-outline-primary my-2 my-sm-0" onClick={() => {clearCookie()}}>Sign Out</button>
        </form>
    )
}

export default SignOut;
