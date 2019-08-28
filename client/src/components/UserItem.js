import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form'

export default class UserItem extends React.Component {
    state = {
        score: this.props.itemMaxValue 
    }

    handleChange = (e) => {
        let value = parseInt(e.target.value.trimLeft('0'));
        const max = e.target.getAttribute("max");
        const min = e.target.getAttribute("min");
        if (isNaN(value)) {
            value = 0;
        }
        if (value > max) {
            value = max;
        } 
        if (value < min) {
            value = min;
        } 

        this.setState({
            score: value
        }, () => this.props.handleChange(e));
    }
    render() {
        return (
            <div className="item-container">
                <p>{this.props.itemDesc}</p>
                <Form className="user-form">
                    <Form.Group controlId="scoreValue">
                        <InputGroup>
                            <Form.Label className="mr-2"> Score </Form.Label>
                            <Form.Control
                            data-category={this.props.category}
                            type="number"
                            min="0"
                            max={this.props.itemMaxValue}
                            defaultValue={this.state.score.toString()}
                            aria-describedby="inputGroupAppend"
                            onChange={this.handleChange}
                            />
                            <InputGroup.Append>
                            <InputGroup.Text id="inputGroupAppend">{this.props.itemMaxValue}</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </div>
        )
    }
    
}