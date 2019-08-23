import React from 'react';
import Axios from 'axios';
import UserCategoryForm from './UserCategoryForm';

class UserView extends React.Component {
  state = {
    categories: [],
    categoryScores: {},
    inputText: "",
    overallMaxScore: 0,
    categoryMaxScores: {}
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

  render() {
    return (
        <div className="userView form-container">
            <h1>User</h1>
            <ul className="category-list">
            {this.state.categories.map(category => (
                <li key={category._id}>
                <UserCategoryForm 
                key={category._id} 
                category={category.category} 
                items={category.items} 
                handleChange={this.handleChange} 
                categoryScore={this.state.categoryScores[category.category]}
                categoryMaxScore={this.state.categoryMaxScores[category.category]}/>
                </li>
            ))}
                <li><h4>Overall score: {this.state.overallScore}/{this.state.overallMaxScore}</h4></li>
            </ul>
        </div>
    );
  }
  
  
  
}

export default UserView;
