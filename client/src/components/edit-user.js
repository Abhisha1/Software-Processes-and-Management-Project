import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from "axios";

class EditUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            oldPassword: '',
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
    onChangeOldPassword(e) {
        this.setState({
            oldPassword: e.target.value,
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
            oldPassword: this.state.oldPassword,
            password: this.state.password
        };

        // Send HTTP POST request to backend endpoint
        axios.post('http://localhost:5000/users/update', user)
            .then(res => {
                //  console.log(res.data);
                this.props.history.push("/home");
            })
            .catch(err => {
                // console.log(err);
                this.setState({
                    showError: true
                })
            });

    }
    render(){
        return(
            <div>
                <h3>Edit account</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.email}
                               id="email"
                               onChange={this.onChangeEmail}
                               placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Current Password</label>
                        <input type="password"
                               required
                               id="old-password"
                               className="form-control"
                               value={this.state.oldPassword}
                               onChange={this.onChangeOldPassword}
                               placeholder="Current Password"
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password"
                               required
                               id="password"
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               placeholder="New Password"
                        />
                    </div>
                    <div className="form-group">
                        <input type ="submit" value="Update" id="submit" className="btn btn-primary"/>
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
export default withRouter(EditUser);