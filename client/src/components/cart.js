import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.getRow = this.getRow.bind(this);
        this.fillTable = this.fillTable.bind(this);
    }

    getRow(quantity, size, type) {
        var subtotal = this.props.getSubtotal(quantity, size, type);
        return (
            <tr key={type+size}>
                <td>{quantity}</td>
                <td>{`${type} Box (${size})`}</td>
                <td>{`$ ${subtotal}`}</td>
            </tr>
        );
    }

    fillTable() {
        const types = ["Fruit", "Vegetable", "Mixed"];
        const sizes = ["Small", "Medium", "Large"];

        var rows = [];
        for (const type of types) {
            for (const size of sizes) {
                var index = size === 'Small'  ? 0 
                          : size === 'Medium' ? 1 
                          : 2;
                var quantity = this.props.order[type][index].quantity;
                if (quantity > 0) {
                    var newRow = this.getRow(quantity, size, type);
                    rows.push(newRow)
                }
            }
        }
        return rows;
    }

    render() {
        const cartEmpty = this.props.order.cartEmpty;
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
                        variant="danger" 
                        onClick={this.props.onResetClick}>
                            RESET CART
                </Button>
                <br />
                <div className="text-right">
                    <h4>Total: AUD ${this.props.order.total}</h4>
                </div>
            </div>
        );
    }
}
 
export default Cart;