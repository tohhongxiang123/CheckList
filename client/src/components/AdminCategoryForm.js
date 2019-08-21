import React, {useState} from 'react';
import AdminItem from './AdminItem';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AdminCategoryForm(props) {
    const [inputText, setInputText] = useState({
        itemDesc:"",
        itemMaxValue:""
    });

    function handleChange(e){
        setInputText({
            ...inputText,
            [e.target.id]:e.target.value
        });
    }

    function addItem(e) {
        e.preventDefault();
        props.addItem(inputText.itemDesc, inputText.itemMaxValue, props.title);
        setInputText({
            itemDesc:"",
            itemMaxValue:""
        });
    }

    function deleteItem(itemDesc) {
        props.deleteItem(itemDesc, props.title);
    }

    return (
        <div className="category-container">
            <div className="category-header">
                <h1>{props.title}</h1>
                <Button variant="secondary" size="sm" onClick={props.deleteCategory.bind(this, props.title)}>Delete Category</Button>
            </div>
            {props.items.map(item => (
                <AdminItem key={item._id} itemDesc={item.itemDesc} itemMaxValue={item.itemMaxValue} deleteItem={deleteItem}/>
            ))}
            <hr />
            <Form className="item-input-container"> 
                <input type="text" id="itemDesc" value={inputText.itemDesc} onChange={handleChange} placeholder="Enter item" />
                <input type="number" min="0" id="itemMaxValue" value={inputText.itemMaxValue} onChange={handleChange} placeholder="Enter Max Value" />
                <Button type="submit" onClick={addItem}>Add item</Button>
            </Form>
                
            
        </div>
    )
}