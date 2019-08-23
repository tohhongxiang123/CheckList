import React from 'react';
import UserItem from './UserItem';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class UserCategoryForm extends React.Component {
    state = {
        reason: "",
        reasons: []
    }

    handleChange = (e) => {
        this.setState({
            reason: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const currentReason = this.state.reason;
        if (currentReason.trim()) {
            let reasonsCopy = [...this.state.reasons];
            reasonsCopy.push(currentReason);
            this.setState({
                reason: "",
                reasons: reasonsCopy
            });
        }
        
    }

    removeReason = (e) => {
        let indexToRemove = e.target.getAttribute('data-index');
        let reasonsCopy = [...this.state.reasons];
        console.log(indexToRemove);
        reasonsCopy.splice(indexToRemove, 1);
        console.log(reasonsCopy);
        this.setState({
            reasons: reasonsCopy
        })
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
                { this.state.reasons.length ? (
                    <>
                    <h4>Reasons for demerit</h4>
                    {this.state.reasons.map((reason, index) => (
                        <div className="reason-container">
                            <p key={index}>{reason}</p> 
                            <Button variant="danger" data-index={index} onClick={this.removeReason}>Remove</Button>
                        </div>
                    ))}
                    </>
                ) : null}
                {this.props.categoryScore < this.props.categoryMaxScore ? (
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                            <Form.Control type="text" placeholder="Enter reason" value={this.state.reason} onChange={this.handleChange} aria-label="Reason" />
                            </Col>
                            <Col>
                            <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                    
                ) : null}
               
                    
     
                <div className="clearDiv"></div>
            </div>
        )
    }
   
}