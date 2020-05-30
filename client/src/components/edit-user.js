import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

class EditUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangeHome = this.onChangeHome.bind(this);
        this.onChangeWork = this.onChangeWork.bind(this);
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);

        this.state = {
            email: '',
            oldPassword: '',
            password: '',
            showError: false,
            showMobileError: false,
            mobile : '',
            home : '',
            work : '',
            address : ''
        }
    }

    onChangeAddress(e){
        this.setState({
            address: e.description,
            showError: false
        });
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
    onChangeMobile(e) {
        this.setState({
            mobile: e.target.value,
            showError: false
        });
    }onChangeHome(e) {
        this.setState({
            home: e.target.value,
            showError: false
        });
    }onChangeWork(e) {
        this.setState({
            work: e.target.value,
            showError: false
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            oldPassword: this.state.oldPassword,
            password: this.state.password,
            mobile: this.state.mobile,
            home: this.state.home,
            work: this.state.work,
            address: this.state.address
        };

        if(this.state.mobile === '' && this.state.home === '' && this.state.work === ''){
            this.setState({
                showMobileError: true
            })
        }else {

            // Send HTTP POST request to backend endpoint
            axios.post('https://jjfresh.herokuapp.com/users/update', user)
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
                        <div className="form-group">
                            <label>New Mobile Number</label>
                            <input type="text"
                                   id="mobile"
                                   className="form-control"
                                   value={this.state.mobile}
                                   onChange={this.onChangeMobile}
                                   placeholder="Mobile Number"
                            />
                        </div>
                        <div className="form-group">
                            <label>New Home number</label>
                            <input type="text"
                                   id="home-number"
                                   className="form-control"
                                   value={this.state.home}
                                   onChange={this.onChangeHome}
                                   placeholder="Home Number"
                            />
                        </div>
                        <div className="form-group">
                            <label>New Work Number</label>
                            <input type="text"

                                   id="work"
                                   className="form-control"
                                   value={this.state.work}
                                   onChange={this.onChangeWork}
                                   placeholder="Work Number"
                            />
                        </div>
                        <div>
                            <GooglePlacesAutocomplete apiKey='AIzaSyAhgPS9xVvesdLc8ETGdv8u31VpKZZDCmA'
                                                      onSelect={this.onChangeAddress}
                            />
                        </div>
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
                    {this.state.showMobileError ?
                        <div id="error2" className="alert alert-danger" role="alert" >
                            You must enter at least one phone number
                        </div>
                        :
                        <div></div>}
                </form>


            </div>
        );
    }
}
export default withRouter(EditUser);