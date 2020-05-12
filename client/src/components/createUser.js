import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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
        axios.post('https://jjfresh.herokuapp.com/users/add', user)
            .then(res => {
                console.log(res.data);
                this.props.history.push("/home");
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
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-group">
                        <input type ="submit" value="Sign up" className="btn btn-primary"/>
                    </div>
                    {this.state.showError ? 
                        <div className="alert alert-danger" role="alert" >
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