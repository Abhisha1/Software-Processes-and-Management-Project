import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";


class Booking extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(date) {
        this.props.onDateChange(date);
    }

    handleClick() {
        this.props.onSubmit();
    }

    render() {
        var cartEmpty = this.props.cartEmpty;
        if (cartEmpty) {
            return null;
        }

        var minDate = new Date();
        var maxDate = new Date();
        minDate.setDate(this.props.date.getDate() + 1);
        maxDate.setDate(minDate.getDate() + 6);

        return (
            <div>
                <h4>Delivery</h4>
                <p>Please select date and time for delivery</p>
                <div>
                    <DatePicker
                    selected={this.props.date}
                    onChange={this.handleChange}
                    showTimeSelect
                    includeTimes={[
                        setHours(setMinutes(new Date(), 0), 16),
                        setHours(setMinutes(new Date(), 0), 17),
                        setHours(setMinutes(new Date(), 0), 18),
                    ]}
                    minDate={minDate}
                    maxDate={maxDate}
                    timeIntervals={60}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
                <br />
                <div className="text-right">
                    <Button type="submit"
                            onClick={this.handleClick}>
                                SUBMIT ORDER
                    </Button>
                </div>
            </div>
        );
    }
}
 
export default Booking;