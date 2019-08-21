import React from 'react';
import axios from 'axios';
import AdminCategoryForm from './AdminCategoryForm';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

class AdminView extends React.Component {
  state = {
    categories: [],
    inputText: ""
  };

  fetchData = async () => {
    const res = await axios.get('/api/checklist');
    console.log(res.data);
    this.setState({
      categories: res.data,
    });
    return res.data;
  }

  async componentDidMount() {
    this.fetchData();
  }

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value
    });
    // setInputText(e.target.value);
  }

  addItem = async (inputText, maxVal, category) => {
    const payload={itemDesc: inputText, itemMaxValue: maxVal};
    let category_copy = [...this.state.categories].find(category_ => category_.category === category);
    category_copy.items.push(payload);
    
    const res = await axios.put('/api/checklist/edit', category_copy);
    console.log(res.data);
    this.fetchData();
  }

  deleteItem = async (itemDesc, category) => {
    let category_copy = [...this.state.categories].find(category_ => category_.category === category);
    category_copy.items = category_copy.items.filter(item => item.itemDesc !== itemDesc);

    const res = await axios.put('/api/checklist/edit', category_copy);
    console.log(res.data);
    this.fetchData();
  }

  deleteCategory = async (category) => {
    // setCategories(category_copy);
    const res = await axios.delete('/api/checklist/delete/' + category);
    console.log(res.data);
    this.fetchData();
  }

  addCategory = async (e) => {
    e.preventDefault();
    const newCategory = {
      category: this.state.inputText,
      items: []
    }

    const res = await axios.post('/api/checklist/add', newCategory);
    this.setState({
      inputText: ""
    })
    console.log(res.data);
    this.fetchData();
  }

  render() {
    
    return (
        <div className="adminView form-container">
          <h1>Admin</h1>
          <ul className="category-list">
            {this.state.categories.map(category => (
              <li key={category._id}>
                <AdminCategoryForm key={category._id} title={category.category} items={category.items} addItem={this.addItem} deleteItem={this.deleteItem} deleteCategory={this.deleteCategory} />
              </li>
            ))}
            <Form className="category-input-container">
              <input type="text" name="category" onChange={this.handleChange} value={this.state.inputText} placeholder="Enter category"/>
              <Button type="submit" onClick={this.addCategory}>Add category</Button>
            </Form>
          </ul>
        </div>
    );
  }  
}

export default AdminView;
