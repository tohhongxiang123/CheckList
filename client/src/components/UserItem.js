import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form'

export default class UserItem extends React.Component {
    state = {
        score: null
    }

    componentDidMount() {
        this.setState({
            score: this.props.itemMaxValue
        }, () => {
            this.props.handleChange()
        });
    }

    handleChange = (e) => {
        let value = parseInt(e.target.value);
        const max = parseInt(e.target.getAttribute("max"));
        const min = parseInt(e.target.getAttribute("min"));
        console.log(value, min, max);
        if (isNaN(value)) {
            value = 0;
        }
        if (value > max) {
            value = max;
            console.log("ABOVCE MAX");
        } 
        if (value < min) {
            value = min;
            console.log("BELKOW MIN");
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
                            value={'' + this.state.score} // some weird leading zero fix, https://github.com/facebook/react/issues/9402
                            defaultValue={this.props.itemMaxValue}
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