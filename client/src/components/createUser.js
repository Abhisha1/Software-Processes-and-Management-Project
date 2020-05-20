import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            showError: false
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
        e.preventDefault(); // Prevent default HTML submit form behaviour
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(user);

        // Send HTTP POST request to backend endpoint
        axios.post('http://localhost:5000/users/add', user)
            .then(res => {
                console.log(res.data);
                setCookie("authorised", "userIsAuthorised", 0.02);
                setCookie("uId", res.data.id, 0.02);
                window.location.href = "/home";
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    showError: true
                })
            });

        this.setState({
            email: '',
            password: ''
        });
    }


    render() {
        return (
            <div>
                <h3>Create account</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email"
                            id="email"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password"
                            id="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" id="submit" value="Sign up" className="btn btn-primary"/>
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

export default withRouter(CreateUser);