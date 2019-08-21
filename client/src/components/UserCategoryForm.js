import React from 'react';
import UserItem from './UserItem';

export default function UserCategoryForm(props) {

    return (
        <div className="category-container">
            <h1>{props.category}</h1>
            {props.items.map(item => (
                <UserItem key={item._id} itemDesc={item.itemDesc} itemMaxValue={item.itemMaxValue} category={props.category}/>
            ))}
            {props.items.length > 0 ? (
                <div className="text-right category-score">
                    <p>{props.category} Score: <b></b></p>
                </div>
            ): (
                <p> No items set </p>
            )}
            
            <div className="clearDiv"></div>
        </div>
    )
}