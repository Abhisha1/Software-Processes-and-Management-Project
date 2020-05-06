import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
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
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

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
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="text"
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
                </form>
            </div>
        );
    }
}