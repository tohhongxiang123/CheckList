import React from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default class ConfirmSubmission extends React.Component {
    render() {
        console.log(this.props);
        return (
            <Jumbotron>
                <h4> {this.props.camp} </h4>
                <p> Cookhouse {this.props.cookhouse} </p>
                {this.props.categories.map((category) => {
                    return (
                        <>
                            <h2> {category.category} - {this.props.categoryScores[category.category]}/{this.props.categoryMaxScores[category.category]} </h2>
                            <ul>
                                {this.props.categoryReasons[category.category] && this.props.categoryReasons[category.category].length ?
                                this.props.categoryReasons[category.category].map(reason => (<li>{reason}</li>)) :
                                <li> No reasons inputted </li>
                                } 
                            </ul>
                        </>
                    )
                })}
                <p> Confirm? </p>
                <Button onClick={this.props.prevStep}> Back </Button>
            </Jumbotron>
            
        )
    }
}