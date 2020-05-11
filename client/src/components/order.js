import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import ProductForm from './productForm';
import Cart from './cart';
import Booking from './booking';

class Order extends Component {
    constructor(props) {
        super(props);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleResetCart = this.handleResetCart.bind(this);
        this.updateState = this.updateState.bind(this);

        // TODO: Experiment with replacing state with array of objects
        this.state = {
            FruitSmall: 0,
            FruitMedium: 0,
            FruitLarge: 0,
            VegetableSmall: 0,
            VegetableMedium: 0,
            VegetableLarge: 0,
            MixedSmall: 0,
            MixedMedium: 0,
            MixedLarge: 0,
            cartEmpty: true,
            total: 0
        };
    }

    updateState(type, size, quantity) {
        const typeSize = type + size;
        this.setState((state) => {
            const oldQuantity = state[type+size];
            const oldTotal = state.total;
            return {
                [typeSize]: oldQuantity + quantity,
                cartEmpty: false,
                total: oldTotal + this.getSubtotal(quantity, size, type)
            }
        });
    }


    handleAddToCart(item) {
        console.log('State: ' + JSON.stringify(this.state));
        var size = item.size;
        var type = item.type;
        var quantity = item.quantity;

        this.updateState(type, size, quantity);
    }


    getSubtotal(quantity, size, type) {
        const price = {"Fruit": 20, "Vegetable": 15, "Mixed": 18};
        const factor = {"Small": 1, "Medium": 2, "Large": 3};
        return quantity * price[type] * factor[size];
    }


    handleResetCart() {
        this.setState({
            FruitSmall: 0,
            FruitMedium: 0,
            FruitLarge: 0,
            VegetableSmall: 0,
            VegetableMedium: 0,
            VegetableLarge: 0,
            MixedSmall: 0,
            MixedMedium: 0,
            MixedLarge: 0,
            cartEmpty: true,
            total: 0
        });
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
                        <Booking cartEmpty={this.state.cartEmpty} />
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default Order;