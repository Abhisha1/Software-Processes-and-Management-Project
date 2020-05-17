import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";


class Booking extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            dateSelected: false,
            timeSelected: false
        }
    }

    handleChange(date) {
        this.props.onDateChange(date);
        this.setState({
            dateSelected: true
        });
    }

    handleSubmit() {
        this.props.onSubmit();
    }


    handleSelect(eventKey, event) {
        // Set active button for time selected
        const ids = [1, 2, 3];
        ids.forEach(id => {
            var button = document.getElementById(id);
            button.className = button.className.replace(" active", "");
        });
        var active = document.getElementById(eventKey);
        active.className += " active";

        const time = event.target.value;
        this.props.onTimeChange(time);

        this.setState({
            timeSelected: true
        });
    }


    render() {
        var cartEmpty = this.props.cartEmpty;
        if (cartEmpty) {
            return null;
        }

        var minDate = addDays(new Date(), 1);
        var maxDate = addDays(minDate, 6);

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
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Select time
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item id="1" as="button" eventKey={1} onSelect={this.handleSelect} value="4:00PM - 5:00PM">4:00PM - 5:00PM</Dropdown.Item>
                                <Dropdown.Item id="2" as="button" eventKey={2} onSelect={this.handleSelect} value="5:00PM - 6:00PM">5:00PM - 6:00PM</Dropdown.Item>
                                <Dropdown.Item id="3" as="button" eventKey={3} onSelect={this.handleSelect} value="6:00PM - 7:00PM">6:00PM - 7:00PM</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <br />
                <div className="text-right">
                    <Button type="submit"
                            disabled={!(this.state.dateSelected && this.state.timeSelected)}
                            onClick={this.handleSubmit}>
                                SUBMIT ORDER
                    </Button>
                </div>
            </div>
        );
    }
}
 
export default Booking;