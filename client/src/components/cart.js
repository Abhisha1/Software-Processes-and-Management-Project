import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



class Cart extends Component {
    constructor(props) {
        super(props);
        //this.updateCart = this.updateCart.bind(this);
        this.getRow = this.getRow.bind(this);
        this.getTypeSize = this.getTypeSize.bind(this);
        this.fillTable = this.fillTable.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }


    getRow(quantity, size, type) {
        var subtotal = this.props.getSubtotal(quantity, size, type);
        return (
            <tr>
                <td>{quantity}</td>
                <td>{`${type} Box (${size})`}</td>
                <td>{`$ ${subtotal}`}</td>
            </tr>
        );
    }

    getTypeSize() {
        let l = [
            <tr><td>2</td><td>fruit box (LARGE lol)</td><td>AUD $40</td></tr>,
            <tr><td>2</td><td>fruit box (LARGE lol)</td><td>AUD $40</td></tr>
        ];

        l.push(<tr><td>69</td><td>fruit box (medium lol)</td><td>AUD $600</td></tr>);


        return l;
    }



    fillTable() {
        const types = ["Fruit", "Vegetable", "Mixed"];
        const sizes = ["Small", "Medium", "Large"];
        /*
        var order = {
            "Fruit": {"Small": 0, "Medium": 0, "Large": 10},
            "Vegetable": {"Small": 0, "Medium": 5, "Large": 0},
            "Mixed": {"Small": 2, "Medium": 0, "Large": 0},
        };
        */

        var rows = [];
        for (const type of types) {
            for (const size of sizes) {
                var typeSize = type + size;
                var quantity = this.props.order[typeSize];
                if (quantity > 0) {
                    var newRow = this.getRow(quantity, size, type);
                    rows.push(newRow)
                }
            }
        }
        return rows;
    }

    handleResetClick() {
        this.props.onResetClick();
    }


    render() {
        const cartEmpty = this.props.order.cartEmpty;
        //console.log('cartEmpty: ' + cartEmpty);
        if (cartEmpty) {
            return (
                <div>
                    <h4>Cart</h4>
                    <p>Your cart is empty</p>
                </div>
            );
        }

        return (
            <div>
                <div>
                    <h4>Cart</h4>
                    <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Qty</th>
                        <th>Item</th>
                        <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.fillTable()}
                    </tbody>
                    </Table>
                </div>
                <Button type="reset"
                        variant="secondary" 
                        onClick={this.handleResetClick}>
                            RESET CART
                </Button>
                <div class="container">
                    <div class="row">
                        <div class="col text-left">
                        </div>
                        <div class="col text-right">
                            <h4>Total: AUD ${this.props.order.total}</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Cart;