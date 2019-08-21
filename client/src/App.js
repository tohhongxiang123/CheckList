import React from 'react';
import AdminView from "./components/AdminView";
import UserView from "./components/UserView";
import './App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <AdminView />
        <UserView />
      </>
    )
  }
  
  
  
}

export default App;
