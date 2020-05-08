import React, { Component } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

class Size extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.props.onSizeChange(value);
    }

    render() { 
        return (
            <div>
                <h4>Size</h4>
                <div>
                    <ToggleButtonGroup type="radio" name="sizes" onChange={this.handleChange} defaultValue={"Small"}>
                        <ToggleButton variant="secondary" name="size" value={"Small"}>
                            Small
                        </ToggleButton>
                        <ToggleButton variant="secondary" name="size" value={"Medium"}>
                            Medium
                        </ToggleButton>
                        <ToggleButton variant="secondary" name="size" value={"Large"}>
                            Large
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        );
    }
}
 
export default Size;