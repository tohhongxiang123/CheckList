import React from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Table from 'react-bootstrap/Table';
import XLSX from 'xlsx';

export default class ConfirmSubmission extends React.Component {
    exportCsv = (e) => {
        const wb = XLSX.utils.table_to_book(document.getElementById("data"), {sheet: "Sheet 1", raw:true});
        XLSX.writeFile(wb, 'out.xlsx');
    }
    render() {
        return (
            <Jumbotron>
                <h4> {this.props.camp} </h4>
                <p> Cookhouse {this.props.cookhouse} </p>
                <Table bordered hover id="data">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Score</th>
                            <th>Demerit Reasons</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        {this.props.categories.map((category) => {
                            return (
                                <>
                                    <tr>
                                        <td rowSpan={this.props.categoryReasons[category.category] && this.props.categoryReasons[category.category].length > 0 ? this.props.categoryReasons[category.category].length + 1: 2}>
                                            {category.category} 
                                        </td>
                                        <td rowSpan={this.props.categoryReasons[category.category] && this.props.categoryReasons[category.category].length > 0 ? this.props.categoryReasons[category.category].length + 1 : 2}>
                                            {this.props.categoryScores[category.category]}/{this.props.categoryMaxScores[category.category]}
                                        </td>
                                    </tr>
                                            {this.props.categoryReasons[category.category] && this.props.categoryReasons[category.category].length ?
                                                this.props.categoryReasons[category.category].map(reason => <tr><td>{reason}</td></tr>) : 
                                            <tr><td>No reasons inputted</td></tr>}
                                </>
                                    
                                    
                                
                            )
                        })}
                        <tr>
                            <td style={{textAlign: 'right'}}>Total</td>
                            <td colSpan="2"><strong>{this.props.overallScore}/{this.props.overallMaxScore}</strong></td>
                        </tr>
                    </tbody>
                </Table>
                <p> Confirm? </p>
                <Button onClick={this.exportCsv}> Confirm </Button>
                <Button onClick={this.props.prevStep}> Back </Button>
            </Jumbotron>
            
        )
    }
}