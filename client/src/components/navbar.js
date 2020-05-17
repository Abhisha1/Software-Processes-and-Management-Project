import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AuthNav = <ul className="navbar-nav mr-auto">
    <li className="navbar-item">
        <Link to="/edit" className="nav-link">Edit User</Link>
    </li>
    <li className="navbar-item">
        <Link to="/order" className="nav-link">Order</Link>
    </li>
</ul>

const UnAuthNavBar = <ul className="navbar-nav mr-auto">
    <li className="navbar-item">
        <Link to="/user" className="nav-link">Create User</Link>
    </li>
    <li className="navbar-item">
        <Link to="/login" className="nav-link">Log In</Link>
    </li>

</ul>


// export default class Navbar extends Component {
//     constructor(props){
//         super(props);
//         this.state = {};
//     }
//     componentDidMount = () => {
//         axios.get('http://localhost:5000/users/authenticated-status')
//         .then(res => {
//             this.setState({
//                 isLoading : false,
//                 isLoggedIn : true
//             })

//         })
//         .catch(err => {
//             this.setState({
//                 isLoading : false,
//                 isLoggedIn : false
//             })
//         });
//     }
//     render() {
//         return (
//             <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
//                 <Link to="/" className="navbar-brand">JJFresh</Link>
//                 <div className="collapse navbar-collapse">
//                     {this.state.isLoading ? null : 
//                     this.state.isLoggedIn ? AuthNav : UnAuthNavBar}
//                 </div>
//             </nav>
//         );
//     }
// }


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
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">JJFresh</Link>
            <div className="collapse navbar-collapse">
                {isLoading ? null :
                    isAuth ? AuthNav : UnAuthNavBar}
            </div>
        </nav>


    )
}

export default Navbar;