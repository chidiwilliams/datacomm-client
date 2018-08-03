import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageInput from './MessageInput';
import defaults from '../config/defaults';
import getGraphParams from '../utils/getGraphParams';
import sampleMsg from '../utils/sampleMsg';
import Encoder from './Encoder';

export default class SimulatorInput extends Component {
  static propTypes = {
    updateGraphs: PropTypes.func.isRequired,
  };

  state = {
    bits: defaults.bits,
    currentGraph: 0,
    cutoff: defaults.cutoff,
    enc: [],
    encType: defaults.encType,
    freq: defaults.Fs,
    impPower: defaults.impPower,
    impType: defaults.impType,
    mod: [],
    modType: defaults.modType,
    taps: defaults.taps,
  };

  handleBitsChange = (val) => {
    this.setState({ bits: val }, () => this.updateGraphs());
  };

  handleFreqChange = (val) => {
    this.setState({ freq: val }, () => this.updateGraphs());
  };

  getMsgGraphs = () => {
    const samped = sampleMsg(this.state.bits, this.state.freq);
    this.setState({ samped: samped });
    return getGraphParams(samped, 'Input');
  };

  updateGraphs = () => {
    try {
      // Get desired graphs from selected graph number
      const graphs = {
        0: this.getMsgGraphs,
        1: this.getEncGraphs,
        2: this.getModGraphs,
        3: this.getRecGraphs,
        4: this.getDemodGraphs,
        5: this.getFiltGraphs,
        6: this.getThreshGraphs,
        7: this.getDecGraphs,
      }[this.state.currentGraph]();
      this.props.updateGraphs(graphs);
    } catch (error) {
      console.log(error);
      this.props.updateGraphs(null);
    }
  };

  switchGraph = (id) => {
    this.setState({ currentGraph: id }, () => this.updateGraphs());
  };

  componentWillMount() {
    this.updateGraphs();
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            marginLeft: -2.5,
            marginRight: -2.5,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, padding: 2.5 }}>
            <MessageInput
              updateFreq={this.handleFreqChange}
              updateBits={this.handleBitsChange}
              onGrpLaunch={() => this.switchGraph(0)}
            />
          </div>
          <div style={{ flex: 1, padding: 2.5 }}>
            <Encoder onGrpLaunch={() => this.switchGraph(1)} />
          </div>
        </div>
      </div>
    );
  }
}
