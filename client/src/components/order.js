import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProductForm from './productForm';
import Cart from './cart';
import Booking from './booking';
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";


class Order extends Component {
    constructor(props) {
        super(props);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleResetCart = this.handleResetCart.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.state = {
            cartEmpty: true,
            total: 0,
            date: setHours(setMinutes(new Date(), 0), 16),
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
        // TODO: Update database with order details
        console.log('Order submitted!');
    }

    handleDateChange(date) {
        this.setState({
            date: date
        });
    }

    handleResetCart() {
        this.setState({
            cartEmpty: true,
            total: 0,
            date: new Date(),
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
        });
    }

    render() { 
        return ( 
            <Container>
                <Row>
                    <Col>
                        <ProductForm onSubmit={this.handleAddToCart} 
                        />
                    </Col>
                    <Col>
                        <Cart getSubtotal={this.getSubtotal} 
                              order={this.state} 
                              onResetClick={this.handleResetCart} 
                        />
                        <br />
                        <Booking cartEmpty={this.state.cartEmpty}
                                 date={this.state.date}
                                 onSubmit={this.handleSubmitOrder}
                                 onDateChange={this.handleDateChange}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default Order;