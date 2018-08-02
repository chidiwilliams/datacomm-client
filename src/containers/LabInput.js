import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignalGenerator from './SignalGenerator';
import SpectrometerInput from './SpectrometerInput';

export default class LabInput extends Component {
  static propTypes = {
    updateGraphs: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <SpectrometerInput updateGraphs={this.props.updateGraphs} />
      </div>
    );
  }
}
