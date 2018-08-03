import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SimulatorInput extends Component {
  static propTypes = {
    updateGraphs: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <div>Input</div>
      </div>
    );
  }
}
