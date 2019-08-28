import React from 'react';
import Axios from 'axios';
import UserCategoryForm from './UserCategoryForm';
import ConfirmSubmission from './ConfirmSubmission';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class UserView extends React.Component {
  state = {
    categories: [],
    categoryScores: {},
    categoryReasons: {},
    inputText: "",
    camp: "KC3", 
    cookhouse: "1",
    overallMaxScore: 0,
    overallScore: 0,
    categoryMaxScores: {},
    step: 1
  };

  async componentDidMount() {
    const res = await Axios.get('/api/checklist');
    console.log(res.data);

    let overallMaxScore = 0;
    const categories = res.data;

    let categoryMaxScores = {};
    categories.forEach(category => {
      categoryMaxScores[category.category] = 0;
      category.items.forEach(item => {
        if (!item.disabled) {
          overallMaxScore += parseInt(item.itemMaxValue);
          categoryMaxScores[category.category] += parseInt(item.itemMaxValue);
        }
      });
    });

    this.setState({
      categories,
      overallMaxScore,
      categoryMaxScores
    }, () => this.calculateScores());
    return res.data;
  }

  calculateScores = () => {
    // calculate individual category scores
    const categoryScoresCopy = {...this.state.categoryScores};
    for (let i=0;i<this.state.categories.length; i++) {
      const category = this.state.categories[i].category;
      let categoryScore = 0;
      document.querySelectorAll(`input[data-category="${category}"]`).forEach(item => {
        const currentItemValue = item.value ? parseInt(item.value) : 0;
        categoryScore += currentItemValue;
      });

      categoryScoresCopy[category] = categoryScore;
    }

    this.setState({
      categoryScores: categoryScoresCopy
    }, () => this.calculateOverallScore());
  }

  calculateOverallScore = () => {
    let overallScore = 0;
    for (const [_, value] of Object.entries(this.state.categoryScores)) {
      overallScore += value;
    }

    this.setState({
      overallScore
    });
  }

  handleChange = (e) => {
    this.calculateScores();
  }

  nextStep = (e) => {
    e.preventDefault();
    this.setState({
      step: this.state.step + 1
    });
  }

  prevStep = (e) => {
    e.preventDefault();
    this.setState({
      step: this.state.step - 1
    });
  }

  addReason = (reason, category) => {
    let categoryReasonsCopy = {...this.state.categoryReasons};
    if (reason.trim()) {
      if (!categoryReasonsCopy[category]) {
        categoryReasonsCopy[category] = [];
      } 
      categoryReasonsCopy[category].push(reason);
    }

    this.setState({
      categoryReasons: categoryReasonsCopy
    })
    
}

removeReason = (index, category) => {
    let categoryReasonsCopy = {...this.state.categoryReasons};
    categoryReasonsCopy[category].splice(index, 1);
    this.setState({
        categoryReasons: categoryReasonsCopy
    })
}

handleSelectChange = (e) => {
  this.setState({
    [e.target.id]: e.target.value
  });
}

  render() {
    switch(this.state.step) {
      case 1:
        return (
          <div className="userView form-container">
            <Jumbotron>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="camp">
                    <Form.Label>Select Camp</Form.Label>
                    <Form.Control as="select" value={this.state.camp} onChange={this.handleSelectChange}>
                      <option>KHC</option>
                      <option>SGC</option>
                      <option>KC2</option>
                      <option>KC3</option>
                      <option>SAFTI</option>
                    </Form.Control>
                    </Form.Group>

                  <Form.Group as={Col} controlId="cookhouse">
                    <Form.Label>Select Cookhouse</Form.Label>
                    <Form.Control as="select" value={this.state.cookhouse} onChange={this.handleSelectChange}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
              </Form>
              
           
              <ul className="category-list">
              {this.state.categories.map(category => (
                  <li key={category._id}>
                  <UserCategoryForm 
                  key={category._id} 
                  category={category.category} 
                  items={category.items} 
                  handleChange={this.handleChange} 
                  categoryScore={this.state.categoryScores[category.category]}
                  categoryMaxScore={this.state.categoryMaxScores[category.category]}
                  addReason={this.addReason}
                  removeReason={this.removeReason}
                  reasons={this.state.categoryReasons[category.category]}/>
                  </li>
              ))}
                  <li><h4>Overall score: {this.state.overallScore}/{this.state.overallMaxScore}</h4></li>
              </ul>
              <Button className="continue-btn" onClick={this.nextStep}> Continue </Button>
            </Jumbotron>
        </div>
        )

        case 2: 
              return (
                <ConfirmSubmission 
                categories={this.state.categories} 
                prevStep={this.prevStep} 
                nextStep={this.nextStep} 
                categoryScores={this.state.categoryScores} 
                categoryMaxScores={this.state.categoryMaxScores} 
                categoryReasons={this.state.categoryReasons} 
                cookhouse={this.state.cookhouse} 
                camp={this.state.camp}
                overallMaxScore={this.state.overallMaxScore}
                overallScore={this.state.overallScore} />
              )
    }
        
    
  }
  
  
  
}

export default UserView;
