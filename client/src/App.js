import React from 'react';
import AdminView from "./components/AdminView";
import UserView from "./components/UserView";
import './App.css';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  state = {
    isAdmin: false
  }

  toggleAdmin = () => {
    this.setState({
      isAdmin: !this.state.isAdmin
    })
  }

  render() {
    return (
      <>
      <Button variant="primary" onClick={this.toggleAdmin}>Toggle form</Button>
      { this.state.isAdmin ? (
        <AdminView />
      ) : (
        <UserView />
      )}
        
        
      </>
    )
  }
  
  
  
}

export default App;
