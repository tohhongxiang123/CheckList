import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form'

export default function UserItem(props){
    return (
        <div className="item-container">
            <p>{props.itemDesc}</p>
            <Form className="user-form">
                <Form.Group>
                    <Form.Check
                    id="na-checkbox"
                    onChange={props.changeValue}
                    required
                    label="N.A."
                    />
                </Form.Group>
                <Form.Group controlId="scoreValue">
                    <InputGroup>
                        <Form.Label className="mr-2"> Score </Form.Label>
                        <Form.Control
                        data-category={props.category}
                        type="number"
                        min="0"
                        max={props.itemMaxValue}
                        aria-describedby="inputGroupAppend"
                        onChange={props.changeValue}
                        />
                        <InputGroup.Append>
                        <InputGroup.Text id="inputGroupAppend">{props.itemMaxValue}</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}