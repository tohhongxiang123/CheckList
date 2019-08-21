import React from 'react';
import Button from 'react-bootstrap/Button';

export default function AdminItem(props) {
    function deleteItem(){
        props.deleteItem(props.itemDesc);
    }

    return (
        <div className="item-container">
            <p>{props.itemDesc}, {props.itemMaxValue}</p>
            <Button onClick={deleteItem}>Delete</Button>
        </div>
    )
}