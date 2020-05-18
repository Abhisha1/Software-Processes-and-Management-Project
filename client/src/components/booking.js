import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const axios = require('axios').default; // For IntelliSense


class Booking extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.getAvailableTimes = this.getAvailableTimes.bind(this);

        this.state = {
            dateSelected: false,
            timeSelected: false,
            disableTimeSelection: true
        }
    }

    handleChange(date) {
        setHours(setMinutes(date, 0), 0);
        this.props.onDateChange(date);
        this.setState({
            dateSelected: true,
            timeSelected: false
        });

        this.getAvailableTimes(date);
    }

    handleSubmit() {
        this.props.onSubmit();
    }

    handleSelect(eventKey, event) {
        // Set active button for time selected
        const hourIds = [16, 17, 18];
        hourIds.forEach(id => {
            var button = document.getElementById(id);
            button.className = button.className.replace(" active", "");
        });
        var active = document.getElementById(eventKey);
        active.className += " active";

        const time = Number(event.target.value);
        console.log("Type of time: " + typeof time);
        console.log(time);
        this.props.onTimeChange(time);

        this.setState({
            timeSelected: true
        });
    }

    /*
    getAvailableTimes(date) {
        //console.log(date.getMinutes());
        //console.log(date.getHours());
        const request = { date: date };
        axios.get('http://localhost:5000/orders/bookings/' + date, {
        })
        .then(response => {
            const availableTimes = response.data;
            this.setState({
                availableTimes: availableTimes
            });
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
        .then(() => {
            // Always executed
        });
    }*/


    
    async getAvailableTimes(date) {

        const response = await axios.get('http://localhost:5000/orders/bookings/' + date);

        console.log(JSON.stringify(response.data));


    }



    render() {
        var cartEmpty = this.props.cartEmpty;
        if (cartEmpty) {
            return null;
        }

        var minDate = setHours(setMinutes(addDays(new Date(), 1), 0), 0);
        var maxDate = setHours(setMinutes(addDays(minDate, 6), 0), 0);

        //const availableTimes = this.getAvailableTimes(minDate);
        //console.log("Available Times: " + availableTimes);

        return (
            <div>
                <h4>Delivery</h4>
                <p>Please select date and time for delivery</p>
                <div className="row">
                    <div className="col">
                        <DatePicker
                            dateFormat="MMMM d, yyyy"
                            selected={this.props.date}
                            onChange={this.handleChange}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Select a date" />
                    </div>
                    <div className="col text-right">
                        <Dropdown>
                            <Dropdown.Toggle disabled={!this.state.dateSelected} variant="secondary" id="dropdown-basic">
                                Select time
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item id="16" as="button" eventKey={16} onSelect={this.handleSelect} value={16}>4:00PM - 5:00PM</Dropdown.Item>
                                <Dropdown.Item id="17" as="button" eventKey={17} onSelect={this.handleSelect} value={17}>5:00PM - 6:00PM</Dropdown.Item>
                                <Dropdown.Item id="18" as="button" eventKey={18} onSelect={this.handleSelect} value={18}>6:00PM - 7:00PM</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <br />
                <div className="text-right">
                    <Button type="submit"
                            disabled={(!this.state.dateSelected) || (!this.state.timeSelected)}
                            onClick={this.handleSubmit}>
                                SUBMIT ORDER
                    </Button>
                </div>
            </div>
        );
    }
}
 
export default Booking;