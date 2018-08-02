import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignalGenerator from './SignalGenerator';
import getGraphParams from '../utils/getGraphParams';
import generateWave from '../utils/generateWave';
import defaults from '../config/defaults';

export default class SpectrometerInput extends Component {
  static propTypes = {
    updateGraphs: PropTypes.func.isRequired,
  };

  state = {
    waveshape: defaults.waveshape,
    fa: defaults.Fa,
    fs: defaults.Fs,
  };

  getGraphs() {
    const graphs = getGraphParams(
      generateWave(this.state.waveshape, this.state.fs, this.state.fa),
      'Spectrometer graphs'
    );
    this.props.updateGraphs(graphs);
  }

  handleTypeChange = (val) => {
    this.setState({ waveshape: val }, () => this.getGraphs());
  };

  handleFaChange = (val) => {
    this.setState({ fa: val }, () => this.getGraphs());
  };

  handleFsChange = (val) => {
    this.setState({ fs: val }, () => this.getGraphs());
  };

  componentDidMount() {
    this.getGraphs();
  }

  render() {
    return (
      <div>
        <SignalGenerator
          handleTypeChange={this.handleTypeChange}
          handleFaChange={this.handleFaChange}
          handleFsChange={this.handleFsChange}
        />
      </div>
    );
  }
}
