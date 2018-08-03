import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignalGenerator from './SignalGenerator';
import SpectrometerInput from './SpectrometerInput';
import SimulatorInput from './SimulatorInput';

export default class LabInput extends Component {
  static propTypes = {
    updateGraphs: PropTypes.func.isRequired,
    app: PropTypes.number.isRequired,
  };

  apps = {
    0: <SimulatorInput />,
    1: <SpectrometerInput updateGraphs={this.props.updateGraphs} />,
  };

  render() {
    return <div>{this.apps[this.props.app]}</div>;
  }
}
