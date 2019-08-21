import React from 'react';
import Axios from 'axios';
import UserCategoryForm from './UserCategoryForm';

class UserView extends React.Component {
  state = {
    categories: [],
    inputText: ""
  };

  async componentDidMount() {
    const res = await Axios.get('/api/checklist');
    console.log(res.data);

    let overallMaxScore = 0;
    const categories = res.data;

    categories.forEach(category => {
      category.items.forEach(item => {
        if (!item.disabled) {
          overallMaxScore += parseInt(item.itemMaxValue);
        }
      });
    });

    this.setState({
      categories,
      overallMaxScore
    });
    return res.data;
  }

  render() {
    return (
        <div className="userView form-container">
            <h1>User</h1>
            <ul className="category-list">
            {this.state.categories.map(category => (
                <li key={category._id}>
                <UserCategoryForm key={category._id} category={category.category} items={category.items}/>
                </li>
            ))}
                <li><h4>Overall score: {this.state.overallScore}/{this.state.overallMaxScore}</h4></li>
            </ul>
        </div>
    );
  }
  
  
  
}

export default UserView;
