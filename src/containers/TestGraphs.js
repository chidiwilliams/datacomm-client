import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from '../components/Graph';
import './TestGraphs.css';

export default class TestGraphs extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return (
      <div className="graphs">
        <div className="graph">
          <Graph
            id={0}
            height={'100%'}
            xinput={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            yinput={[0, 1, 0, -1, 0, 1, 0, -1, 0, 1]}
          />
        </div>
        <div className="graph">
          <Graph
            id={1}
            height={'100%'}
            xinput={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            yinput={[1, 1, 0, 0, 1, 1, 0, 0, 1, 1]}
          />
        </div>
      </div>
    );
  }
}
