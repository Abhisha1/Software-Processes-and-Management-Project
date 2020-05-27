import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


function setCookie(cname, cvalue, exdays) {
    console.log("Set");
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.toggleAdmin = this.toggleAdmin.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            showError: false,
            redirect: false,
            isAdmin: false
        }
    }

    toggleAdmin(e) {
        if (this.state.isAdmin){
            this.setState({isAdmin: false});
        }
        else{
            console.log("hello");
            this.setState({isAdmin: true});
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
            showError: false
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
            showError: false
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        if (this.state.isAdmin){
            axios('https://jjfresh.herokuapp.com/admin/login', {method: "post", data: user})
            .then(res => {
              // console.log(res);
               setCookie("authorised", "adminIsAuthorised", 0.02);
               window.location.href = "/viewBookings";
            })
            .catch(err => {
               // console.log(err);
                this.setState({
                    showError: true
                })
            });
        }
        // Send HTTP POST request to backend endpoint
        else{
            axios('https://jjfresh.herokuapp.com/users/login', {method: "post", data: user})
            .then(res => {
              // console.log(res);
               setCookie("authorised", "userIsAuthorised", 0.02);
               setCookie("uId", res.data.id, 0.02);
               window.location.href = "/home";
            })
            .catch(err => {
               // console.log(err);
                this.setState({
                    showError: true
                })
            });
        }

    }


    render() {
        return (
            <div>
                {this.state.isAdmin ? <h3>Admin login</h3> 
                : <h3>Login</h3>}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email"
                            required
                            className="form-control"
                            value={this.state.email}
                            id="email"
                            onChange={this.onChangeEmail}
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password"
                            required
                            id="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" onChange={this.toggleAdmin} id="adminLoginBox" />
                        <label className="form-check-label" htmlFor="adminLoginBox">Login as a JJFresh admin</label>
                    </div>
                    <div className="form-group">
                        <input type ="submit" value="Log in" id="submit" className="btn btn-primary"/>
                    </div>
                    {this.state.showError ? 
                        <div id="error" className="alert alert-danger" role="alert" >
                        The details you entered are invalid, please try again
                    </div>
                    : 
                    <div></div>}
                </form>
            </div>
        );
    }
}

export default withRouter(Login);