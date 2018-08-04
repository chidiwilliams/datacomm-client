import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getGraphParams from '../utils/getGraphParams';
import generateWave from '../utils/generateWave';
import defaults from '../config/defaults';
import LabGroup from '../components/LabGroup.js';
import ButtonSelect from './ButtonSelect';
import ButtonCrement from './ButtonCrement';

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
        <LabGroup
          title="Spectrometer"
          selected
          inputs={[
            {
              label: 'Waveshape',
              component: <ButtonSelect onChange={this.handleTypeChange} />,
            },
            {
              label: 'Signal frequency',
              component: (
                <ButtonCrement
                  options={defaults.allFa}
                  startIndex={defaults.allFa.indexOf(defaults.Fa)}
                  handleChange={this.handleFaChange}
                />
              ),
            },
            {
              label: 'Sampling frequency',
              component: (
                <ButtonCrement
                  options={defaults.allFs}
                  startIndex={defaults.allFs.indexOf(defaults.Fs)}
                  handleChange={this.handleFsChange}
                />
              ),
            },
          ]}
        />
      </div>
    );
  }
}
