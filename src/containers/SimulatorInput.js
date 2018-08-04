import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageInput from './MessageInput';
import defaults from '../config/defaults';
import getGraphParams from '../utils/getGraphParams';
import sampleMsg from '../utils/sampleMsg';
import Encoder from './Encoder';
import { encHamming } from '../utils/encode';
import Modulator from './Modulator';
import { modBPSK } from '../utils/modulate';
import LabGroup from '../components/LabGroup';
import ButtonCrement from './ButtonCrement';

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

  handleEncChange = (val) => {
    this.setState({ encType: val }, () => this.updateGraphs());
  };

  handleModChange = (val) => {
    this.setState({ modType: val }, () => this.updateGraphs());
  };

  doHamming = () => encHamming(this.state.bits, this.state.freq);
  modBPSK = () => modBPSK(this.doHamming());

  getMsgGraphs = () => {
    const samped = sampleMsg(this.state.bits, this.state.freq);
    this.setState({ samped: samped });
    return getGraphParams(samped, 'Input');
  };

  getEncGraphs = () => {
    if (this.state.encType !== 'hamm') {
      throw new Error('Invalid encoding type given.');
    }

    const enc = this.doHamming();
    this.setState({ enc: enc });
    return getGraphParams(enc, 'Encoded');
  };

  getModGraphs = () => {
    if (this.state.modType !== 'bpsk') {
      throw new Error('Invalid modulation type given.');
    }

    const mod = this.modBPSK();
    this.setState({ mod: mod });
    return getGraphParams(mod, 'Modulated');
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
              selected={this.state.currentGraph === 0}
            />
          </div>
          <div style={{ flex: 1, padding: 2.5 }}>
            <div style={{ marginBottom: 12.5 }}>
              <LabGroup
                title="Encoder"
                onGrpLaunch={() => this.switchGraph(1)}
                selected={this.state.currentGraph === 1}
                inputs={[
                  {
                    label: 'Scheme',
                    component: (
                      <ButtonCrement
                        options={defaults.allEnc}
                        handleChange={(idx) =>
                          this.handleEncChange(defaults.allEnc[idx])
                        }
                      />
                    ),
                  },
                ]}
              />
            </div>
            <div style={{ marginBottom: 12.5 }}>
              <LabGroup
                title="Modulator"
                onGrpLaunch={() => this.switchGraph(2)}
                selected={this.state.currentGraph === 2}
                inputs={[
                  {
                    label: 'Modulation scheme',
                    component: (
                      <ButtonCrement
                        options={defaults.allModTypes}
                        handleChange={(idx) =>
                          this.handleModChange(defaults.allEnc[idx])
                        }
                      />
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
