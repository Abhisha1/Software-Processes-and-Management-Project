import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProductForm from './productForm';
import Cart from './cart';
import Booking from './booking';
import setHours from "date-fns/setHours";


class Order extends Component {
    constructor(props) {
        super(props);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleResetCart = this.handleResetCart.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.getQuantities = this.getQuantities.bind(this);
        this.getOrder = this.getOrder.bind(this);
        this.state = this.getInitialState();
    }

    updateState(type, size, quantity) {
        this.setState((state) => {
            const index = size === 'Small'  ? 0 
                        : size === 'Medium' ? 1 
                        : 2;
            var quantities = state[type].slice();
            var updatedQuantities = quantities.map((qty) => Object.assign({}, qty));
            updatedQuantities[index].quantity += quantity;

            return {
                total: state.total + this.getSubtotal(quantity, size, type),
                cartEmpty: false,
                [type]: updatedQuantities
            }
        });
    }

    handleAddToCart(item) {
        var size = item.size;
        var type = item.type;
        var quantity = item.quantity;
        this.updateState(type, size, quantity);
    }

    getSubtotal(quantity, size, type) {
        const price = { "Fruit": 20, "Vegetable": 15, "Mixed": 18 };
        const factor = { "Small": 1, "Medium": 2, "Large": 3 };
        return quantity * price[type] * factor[size];
    }

    handleSubmitOrder() {
        const order = this.getOrder();
        // TODO: Remove console logs
        console.log("Order:  " + JSON.stringify(order));
        console.log("Date:   " + order.date.toDateString());
        console.log("Hour:   " + order.date.getHours());
        console.log("Minute: " + order.date.getMinutes())

        // Send HTTP POST request to backend endpoint
        axios.post('https://jjfresh.herokuapp.com/orders/add', order)
            .then(res => {
                console.log(res.data);
                //this.props.history.push("/home");
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleDateChange(date) {
        this.setState({
            date: date
        });
    }

    handleTimeChange(time) {
        this.setState((state) => {
            var date = state.date;
            return {
                date: setHours(date, time)
            }
        });
    }

    handleResetCart() {
        const initialState = this.getInitialState();
        this.setState(initialState);
    }

    getInitialState() {
        return {
            cartEmpty: true,
            total: 0,
            date: null,
            time: null,
            'Fruit': [{
                size: 'Small', 
                quantity: 0
            }, {
                size: 'Medium',
                quantity: 0,
            }, {
                size: 'Large',
                quantity: 0,
            }],
            'Vegetable': [{
                size: 'Small', 
                quantity: 0
            }, {
                size: 'Medium',
                quantity: 0,
            }, {
                size: 'Large',
                quantity: 0,
            }],
            'Mixed': [{
                size: 'Small', 
                quantity: 0
            }, {
                size: 'Medium',
                quantity: 0,
            }, {
                size: 'Large',
                quantity: 0,
            }]
        }
    }

    getQuantities(type) {
        // Returns a 'quantities' object that can be stored as a value 
        // for each key in the 'items' field of the 'order' object
        var quantities = {};
        var stateQuantities = this.state[type];
        console.log(JSON.stringify(stateQuantities));
        for (var entry of stateQuantities) {
            var size = entry.size;
            var quantity = entry.quantity;
            quantities[size] = quantity;
        }
        return quantities;
    }
    
    getOrder() {
        // Return an 'order' object that can be stored in the database
        const order = {
            email: "testUser@gmail.com", // TODO: Get actual user's email
            date: this.state.date,
            total: this.state.total,
            items: {
                Fruit: this.getQuantities('Fruit'),
                Vegetable: this.getQuantities('Vegetable'),
                Mixed: this.getQuantities('Mixed')
            }
        }
        return order;
    }

    render() { 
        return ( 
            <Container>
                <Row>
                    <Col>
                        <ProductForm onSubmit={this.handleAddToCart} />
                    </Col>
                    <Col>
                        <Cart getSubtotal={this.getSubtotal} 
                              order={this.state} 
                              onResetClick={this.handleResetCart} />
                        <br />
                        <Booking cartEmpty={this.state.cartEmpty}
                                 date={this.state.date}
                                 onSubmit={this.handleSubmitOrder}
                                 onDateChange={this.handleDateChange}
                                 onTimeChange={this.handleTimeChange} />
                        <br />
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default Order;