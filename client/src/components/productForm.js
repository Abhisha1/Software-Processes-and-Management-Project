import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Size from './size';
import SizeInfo from './sizeInfo';
import Type from './type';
import Quantity from './quantity';


// Note: this whole form and all components took ~2.5 hours


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
        this.setState({size: size});
    }

    handleTypeChange(type) {
        this.setState({type: type});
    }

    handleQuantityChange(delta) {
        // Ensure quantity does not reach zero
        var newQuantity = this.state.quantity + delta;
        if (newQuantity < 1) {
            newQuantity = 1;
        }
        this.setState({quantity: newQuantity});
    }

    resetState() {
        this.setState({
            size: 'Small',
            type: 'Fruit',
            quantity: 1
        });
    }

    handleSubmit(event) {
        // TODO: need to reset buttons
        //console.log('clicked submit button');
        event.preventDefault();
        const item = {
            size: this.state.size,
            type: this.state.type,
            quantity: this.state.quantity
        };

        //console.log(item);
        
        // TODO: need to pass order to higher order component
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
                <Quantity onQuantityChange={this.handleQuantityChange} quantity={this.state.quantity}/>
                <br />
                
                {/* FOR DEBUGGING
                <p>Current size selected: {this.state.size}</p>
                <p>Current type selected: {this.state.type}</p>
                <p>Current quantity: {this.state.quantity}</p>
                */}
                
                <Button type="submit" onClick={this.handleSubmit}>ADD TO CART</Button>
            </div>
            
        );
    }
}

export default ProductForm;