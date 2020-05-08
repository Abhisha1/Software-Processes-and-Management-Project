import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

function Counter(props) {
    return (
        <Button className="counter" variant="light">
            {props.value}
        </Button>
    );
}

export default Counter;