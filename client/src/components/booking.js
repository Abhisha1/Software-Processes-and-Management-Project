import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const axios = require('axios').default; // Enables IntelliSense for axios


class Booking extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.getAvailableTimes = this.getAvailableTimes.bind(this);
        this.deactivateTimes = this.deactivateTimes.bind(this);
        this.activateTime = this.activateTime.bind(this);
        this.state = {
            dateSelected: false,
            timeSelected: false,
            disableTimeSelection: true,
            orderSubmitted: false,
            16: false, // 4PM to 5PM booking availability
            17: false, // 5PM to 6PM booking availability 
            18: false  // 6PM to 7PM booking availability
        }
    }

    handleChange(date) {
        date = setHours(setMinutes(date, 0), 0);
        this.props.onDateChange(date);
        this.setState({
            dateSelected: true,
            timeSelected: false
        });
        this.getAvailableTimes(date);
    }

    handleSubmit() {
        this.props.onSubmit();
        this.setState({
            orderSubmitted: true
        });
    }

    deactivateTimes() {
        const hourIds = ['16', '17', '18'];
        hourIds.forEach(id => {
            var button = document.getElementById(id);
            button.className = button.className.replace(" active", "");
        });
    }

    activateTime(id) {
        var active = document.getElementById(id);
        active.className += " active";

    }

    handleSelect(eventKey, event) {
        // Set button to be active for time selected
        this.deactivateTimes();
        this.activateTime(eventKey);

        // Update the order
        const time = Number(event.target.value);
        this.props.onTimeChange(time);
        this.setState({
            timeSelected: true
        });
    }
 
    getAvailableTimes(date) {
        // Disable time selection until server returns available times
        this.setState({
            disableTimeSelection: true
        });

        // Get time availabilities for date from server
        const times = [16, 17, 18];
        times.forEach(async (time) => {
            const dateTime = new Date(date.setHours(time));
            const response = await axios.get('https://jjfresh.herokuapp.com/orders/bookings/' + dateTime);
            const availability = response.data;
            this.setState({
                [time]: availability
            });
        });

        // Enable time selection
        this.setState({
            disableTimeSelection: false
        });
    }

    render() {
        // If cart is empty, render nothing
        var cartEmpty = this.props.cartEmpty;
        if (cartEmpty) {
            return null;
        }

        // Set available booking days for only the next week
        var minDate = setHours(setMinutes(addDays(new Date(), 1), 0), 0);
        var maxDate = setHours(setMinutes(addDays(minDate, 6), 0), 0);

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
                            <Dropdown.Toggle disabled={this.state.disableTimeSelection} variant="secondary" id="dropdown-basic">
                                Select time
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item id="16" as="button" disabled={!this.state[16]} eventKey={16} onSelect={this.handleSelect} value={16}>4:00PM - 5:00PM</Dropdown.Item>
                                <Dropdown.Item id="17" as="button" disabled={!this.state[17]} eventKey={17} onSelect={this.handleSelect} value={17}>5:00PM - 6:00PM</Dropdown.Item>
                                <Dropdown.Item id="18" as="button" disabled={!this.state[18]} eventKey={18} onSelect={this.handleSelect} value={18}>6:00PM - 7:00PM</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <br />
                <div className="text-right">
                    <Button id="submitOrder" type="submit"
                            disabled={(!this.state.dateSelected) || (!this.state.timeSelected) || (this.state.orderSubmitted)}
                            onClick={this.handleSubmit}>
                                SUBMIT ORDER
                    </Button>
                </div>
                <br />
                <div>
                    {this.state.orderSubmitted ? 
                        /*<Alert variant="success">
                            Your order has been successfully submitted!
                            You will shortly receive an email confirming
                            your order details.
                        </Alert>*/
                        null
                        : null}
                </div>
            </div>
        );
    }
}
 
export default Booking;