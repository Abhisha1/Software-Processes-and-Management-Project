import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert';

class SizeInfo extends Component {
    constructor(props) {
        super(props);
        this.getRecommendation = this.getRecommendation.bind(this);
    }
    render() { 
        return (  
            <Alert variant="info">Suitable for a {this.getRecommendation(this.props.size)}</Alert>
        );
    }

    getRecommendation(size) {
        switch (size) {
            case "Small":
                return "couple";
            case "Medium":
                return "family of 4";
            case "Large":
                return "family of 6";
            default:
                return "family";
        }
    }
}
 
export default SizeInfo;