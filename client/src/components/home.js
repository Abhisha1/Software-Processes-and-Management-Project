import React, { Component } from 'react';
import "./home.css";

export default class Home extends Component {

    render() {
        return (
            <div className="homeContainer">
                <div className="pic">
                    <div className="headings">
                        <h1 id="firstHeading" >Welcome To JJ Fresh. Home of the freshest produce you can order. </h1>
                        <h3 id="secondHeading"> At JJ fresh we sell only the freshest ingredients, so you can focus on cooking.</h3>
                        <a href="/viewBookings" className="btn btn-primary" id="viewOrderButton">View all orders</a>
                    </div>
                </div>
            </div>

        );
    }
}



