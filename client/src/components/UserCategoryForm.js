import React from 'react';
import UserItem from './UserItem';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class UserCategoryForm extends React.Component {
    state = {
        reason: ""
    }

    handleChange = (e) => {
        this.setState({
            reason: e.target.value
        })
    }

    addReason = (e) => {
        e.preventDefault();
        const currentReason = this.state.reason;
        this.props.addReason(currentReason, this.props.category);
        this.setState({
            reason: ""
        })
    }

    removeReason = (e) => {
        this.props.removeReason(e.target.getAttribute('data-index'), this.props.category);
    }

    render() {
        return (
            <div className="category-container">
                <div className="category-header">
                    <h1>{this.props.category}</h1>
                    <div className="text-right category-score">
                        <p><b>{this.props.categoryScore}/{this.props.categoryMaxScore}</b></p>
                    </div>
                </div>
                {this.props.items.map(item => (
                    <UserItem key={item._id} itemDesc={item.itemDesc} handleChange={this.props.handleChange} itemMaxValue={item.itemMaxValue} category={this.props.category}/>
                ))}
                { this.props.reasons && this.props.reasons.length > 0 ? (
                    <div className="reasons-container">
                    <p><strong>Reasons for demerit</strong></p>
                    {this.props.reasons.map((reason, index) => (
                        <div className="reason-container">
                            <p key={index}>{reason}</p> 
                            <Button variant="danger" data-index={index} onClick={this.removeReason}>&times;</Button>
                        </div>
                    ))}
                    </div>
                ) : null}
                {this.props.categoryScore < this.props.categoryMaxScore ? (
                    <Form className="demerit-reason-form" onSubmit={this.addReason}>
                        <Form.Control type="text" placeholder="Enter reason" value={this.state.reason} onChange={this.handleChange} aria-label="Reason" />
                        <Button type="submit">Submit</Button>
                    </Form>
                    
                ) : null}
               
                    
                <hr />
                <div className="clearDiv"></div>
            </div>
        )
    }
   
}