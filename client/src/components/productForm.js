import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Size from './size';
import SizeInfo from './sizeInfo';
import Type from './type';
import Quantity from './quantity';


class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            size: 'Small',
            type: 'Fruit',
            quantity: 1
        }
    }

    handleSizeChange(size) {
        this.setState({
            size: size
        });
    }

    handleTypeChange(type) {
        this.setState({
            type: type
        });
    }

    handleQuantityChange(delta) {
        // Ensure quantity does not reach extreme values
        var newQuantity = this.state.quantity + delta;
        if (newQuantity < 1) {
            newQuantity = 1;
        } else if (newQuantity > 10) {
            newQuantity = 10;
        }
        this.setState({
            quantity: newQuantity
        });
    }

    resetState() {
        this.setState({
            size: 'Small',
            type: 'Fruit',
            quantity: 1
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const item = {
            size: this.state.size,
            type: this.state.type,
            quantity: this.state.quantity
        };
        this.props.onSubmit(item);
    }

    render() { 
        return (
            <div>
                <Size onSizeChange={this.handleSizeChange}/>
                <br />
                <SizeInfo size={this.state.size} />
                <Type onTypeChange={this.handleTypeChange}/>
                <br />
                <Quantity onQuantityChange={this.handleQuantityChange} 
                          quantity={this.state.quantity}/>
                <br />
                <Button id="addToCartButton" type="submit" 
                        onClick={this.handleSubmit}>
                            ADD TO CART
                </Button>
            </div>
        );
    }
}

export default ProductForm;