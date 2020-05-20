import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Counter from './counter';

class Quantity extends Component {
    constructor(props) {
        super(props);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
    }

    handleIncrement() {
        this.props.onQuantityChange(1);
    }

    handleDecrement() {
        this.props.onQuantityChange(-1);
    }

    render() { 
        return (  
            <div>
                <h4>Quantity</h4>
                <Button name="change" variant="dark" size="sm" onClick={this.handleDecrement}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </Button>
                <Counter value={this.props.quantity} />
                <Button name="change" variant="dark" size="sm" onClick={this.handleIncrement}>
                    <FontAwesomeIcon icon={faChevronUp} />
                </Button>
            </div>
        );
    }
}
 
export default Quantity;