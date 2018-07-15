import React, { Component } from 'react';
import './App.css';
import ResponsiveDrawer from './components/ResponsiveDrawer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ResponsiveDrawer />
      </div>
    );
  }
}

export default App;
