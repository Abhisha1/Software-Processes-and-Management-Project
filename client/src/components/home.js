import React, { Component } from 'react';
import Homepage from './../public/Homepage.JPG';
import styles from "./styles.css";

export default class Home extends Component {

    render() {
        return (
            <div class = "pic">
                <div class = "headings">
                    <h1 id = "firstHeading" >Welcome To JJ Fresh. Home of the freshest produce you can order. </h1>
                    <h3 id = "secondHeading"> At JJ fresh we sell only the freshest ingredients, so you can focus on cooking.</h3>
                    <a href="/viewBookings" className="btn btn-primary" id="viewOrderButton">View all orders</a>
                </div>
            </div>


        );
    }
}



