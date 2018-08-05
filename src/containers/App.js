import React, { Component } from 'react';
import './App.css';
import Lab from './Lab';

class App extends Component {
  render() {
    return (
      <div className="App">
        <a href="https://github.com/chidiwilliams/datacomm-client">
          <img
            src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"
            alt="Fork me on GitHub"
            class="github-ribbon"
          />
        </a>
        <Lab />
      </div>
    );
  }
}

export default App;
