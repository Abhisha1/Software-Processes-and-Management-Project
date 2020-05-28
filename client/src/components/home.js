import React, { Component } from 'react';
import Homepage from './../public/Homepage.JPG';
import styles from "./styles.css";

export default class Home extends Component {

    render() {
        return (
            <div>
                <h3>Home</h3>
                <a href="/viewBookings" className="btn btn-primary" id="viewOrderButton">View all orders</a>
            </div>

        );
    }
}



