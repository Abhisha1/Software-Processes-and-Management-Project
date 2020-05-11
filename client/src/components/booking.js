import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import DateTimePicker from './dateTimePicker';


class Booking extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        var date = new Date();
        this.state = {
            date: date.setDate(date.getDate() + 1)
        }
    }

    handleChange(date) {
        this.setState({
            date: date
        });
    }

    render() {
        var cartEmpty = this.props.cartEmpty;
        if (cartEmpty) {
            return null;
        }

        return (
            <div>
                <h4>Delivery</h4>
                <p>Please select date and time for delivery</p>
                <div>
                    <DateTimePicker />
                </div>
                <br />
                <div className="text-right">
                    <Button type="submit">SUBMIT ORDER</Button>
                </div>
            </div>
        );
    }
}
 
export default Booking;