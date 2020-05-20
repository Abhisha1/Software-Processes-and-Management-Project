import React, { Component } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faCarrot, faLeaf } from '@fortawesome/free-solid-svg-icons';


class Type extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.onTypeChange(value);
    }

    render() { 
        return (  
            <div>
                <h4>Type</h4>
                <div>
                    <ToggleButtonGroup type="radio" name="types" onChange={this.handleChange} defaultValue={"Fruit"}>
                            <ToggleButton variant="secondary" name="type" value={"Fruit"}>
                                <FontAwesomeIcon icon={faAppleAlt} /> Fruit
                            </ToggleButton>
                            <ToggleButton variant="secondary" name="type" value={"Vegetable"}>
                                <FontAwesomeIcon icon={faCarrot} /> Vegetable
                            </ToggleButton>
                            <ToggleButton variant="secondary" name="type" value={"Mixed"}>
                                <FontAwesomeIcon icon={faLeaf} /> Mixed
                            </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        );
    }
}
 
export default Type;