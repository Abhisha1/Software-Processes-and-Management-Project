import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, Route } from "react-router-dom";


function PrivateRoute(props) {
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
    return (isLoading ? null :
        isAuth ?
            <Route path={props.path} component={props.component} exact={props.exact} /> :
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )

}

export default PrivateRoute;