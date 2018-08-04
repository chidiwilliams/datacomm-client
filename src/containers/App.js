import React, { Component } from 'react';
import './App.css';
import Lab from './Lab';

class App extends Component {
  render() {
    return (
      <div className="App">
        <a href="https://github.com/chidiwilliams/datacomm-client">
          <img
            style={{ position: 'absolute', top: 0, right: 0, border: 0 }}
            src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"
            alt="Fork me on GitHub"
          />
        </a>
        <Lab />
      </div>
    );
  }
}

export default App;
