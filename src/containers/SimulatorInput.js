import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaults from '../config/defaults';
import getGraphParams from '../utils/getGraphParams';
import sampleMsg from '../utils/sampleMsg';
import { encHamming } from '../utils/encode';
import { modBPSK } from '../utils/modulate';
import LabGroup from '../components/LabGroup';
import ButtonCrement from '../components/ButtonCrement';
import Bit4Input from './Bit4Input';
import { getAWGN, addAWGN } from '../utils/impairment';
import { demodBPSK } from '../utils/demodulate';
import { lowPass } from '../utils/filter';
import threshold from '../utils/threshold';
import { decHamming } from '../utils/decode';
import LabInputSection from '../components/LabInputSection';
import LabInput from '../components/LabInput';
import LabInputColumn from '../components/LabInputColumn';

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

  handleBitsChange = (val) =>
    this.setState({ bits: val }, () => this.updateGraphs());
  handleFreqChange = (val) =>
    this.setState({ freq: val }, () => this.updateGraphs());
  handleEncChange = (val) =>
    this.setState({ encType: val }, () => this.updateGraphs());
  handleModChange = (val) =>
    this.setState({ modType: val }, () => this.updateGraphs());
  handleImpTypeChange = (val) =>
    this.setState({ impType: val }, () => this.updateGraphs());
  handleImpPowerChange = (val) =>
    this.setState({ impPower: val }, () => this.updateGraphs());
  handleTapsChange = (val) =>
    this.setState({ taps: val }, () => this.updateGraphs());
  handleCutOffChange = (val) =>
    this.setState({ cutoff: val }, () => this.updateGraphs());

  doHamming = () => encHamming(this.state.bits, this.state.freq);
  modBPSK = () => modBPSK(this.doHamming());
  addImp = () => addAWGN(this.modBPSK(), this.awgn, this.state.impPower);
  demod = () => demodBPSK(this.doHamming(), this.addImp());
  filter = () => lowPass(this.demod(), this.state.taps, this.state.cutoff);
  thresh = () => threshold(this.filter());
  decode = () => decHamming(this.thresh());

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

  getRecGraphs = () => {
    if (this.state.impType !== 'awgn') {
      throw new Error('Invalid impairment type given.');
    }
    if (Number.isNaN(+this.state.impPower)) {
      throw new Error('Invalid impairment power given.');
    }
    const rec = this.addImp();
    this.setState({ rec: rec });
    return getGraphParams(rec, 'Received');
  };

  getDemodGraphs = () => {
    if (this.state.modType !== 'bpsk') {
      throw new Error('Invalid modulation type given.');
    }
    const demod = this.demod();
    this.setState({ demod: demod });
    return getGraphParams(demod, 'Demodulated');
  };

  getFiltGraphs = () => {
    if (Number.isNaN(+this.state.taps) || Number.isNaN(this.state.cutoff)) {
      throw new Error('Invalid filter parameters given.');
    }

    const filtered = this.filter();
    this.setState({ filtered: filtered });
    return getGraphParams(filtered, 'Filtered');
  };

  getThreshGraphs = () => {
    const thresh = this.thresh();
    this.setState({ thresh: thresh });
    return getGraphParams(thresh, 'Threshold');
  };

  getDecGraphs = () => {
    if (this.state.modType !== 'bpsk') {
      throw new Error('Invalid modulation type given.');
    }

    const dec = this.decode();
    this.setState({ dec: dec });
    return getGraphParams(dec, 'Decoded');
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
    this.awgn = getAWGN(defaults.allFs[defaults.allFs.length - 1]);
    this.updateGraphs();
  }

  render() {
    return (
      <LabInput>
        <LabInputColumn>
          <LabInputSection>
            <LabGroup
              title="1. Message input"
              onGrpLaunch={() => this.switchGraph(0)}
              selected={this.state.currentGraph === 0}
              animated={this.state.currentGraph !== 0}
              inputs={[
                {
                  label: 'Input bits',
                  component: (
                    <Bit4Input
                      onChangeBits={(bits) => this.handleBitsChange(bits)}
                    />
                  ),
                },
                {
                  label: 'Sampling frequency',
                  component: (
                    <ButtonCrement
                      options={defaults.allFs}
                      startIndex={defaults.allFs.indexOf(defaults.Fs)}
                      handleChange={(val) => this.handleFreqChange(val)}
                    />
                  ),
                },
              ]}
            />
          </LabInputSection>
                    <LabInputSection>
            <LabGroup
              title="2. Encoder"
              onGrpLaunch={() => this.switchGraph(1)}
              selected={this.state.currentGraph === 1}
              animated={this.state.currentGraph !== 1}
              inputs={[
                {
                  label: 'Scheme',
                  component: (
                    <ButtonCrement
                      options={defaults.allEnc}
                      handleChange={(val) => this.handleEncChange(val)}
                    />
                  ),
                },
              ]}
            />
          </LabInputSection>
          <LabInputSection>
            <LabGroup
              title="3. Modulator"
              onGrpLaunch={() => this.switchGraph(2)}
              selected={this.state.currentGraph === 2}
              animated={this.state.currentGraph !== 2}
              inputs={[
                {
                  label: 'Modulation scheme',
                  component: (
                    <ButtonCrement
                      options={defaults.allModTypes}
                      handleChange={(val) => this.handleModChange(val)}
                    />
                  ),
                },
              ]}
            />
          </LabInputSection>

        </LabInputColumn>

        <LabInputColumn>

          <LabInputSection>
            <LabGroup
              title="4. Channel"
              onGrpLaunch={() => this.switchGraph(3)}
              selected={this.state.currentGraph === 3}
              animated={this.state.currentGraph !== 3}
              inputs={[
                {
                  label: 'Impairment type',
                  component: (
                    <ButtonCrement
                      startIndex={defaults.allImpTypes.indexOf(
                        defaults.impType
                      )}
                      options={defaults.allImpTypes}
                      handleChange={(val) => this.handleImpTypeChange(val)}
                    />
                  ),
                },
                {
                  label: 'Impairment power',
                  component: (
                    <ButtonCrement
                      startIndex={defaults.allImpPowers.indexOf(
                        defaults.impPower
                      )}
                      options={defaults.allImpPowers}
                      handleChange={(val) => this.handleImpPowerChange(val)}
                    />
                  ),
                },
              ]}
            />
          </LabInputSection>
          <LabInputSection>
            <LabGroup
              title="5. Demodulator"
              onGrpLaunch={() => this.switchGraph(4)}
              selected={this.state.currentGraph === 4}
              animated={this.state.currentGraph !== 4}
            />
          </LabInputSection>
          <LabInputSection>
            <LabGroup
              title="6. Low pass filter"
              onGrpLaunch={() => this.switchGraph(5)}
              selected={this.state.currentGraph === 5}
              animated={this.state.currentGraph !== 5}
              inputs={[
                {
                  label: 'Number of filter taps',
                  component: (
                    <ButtonCrement
                      options={defaults.allTaps}
                      startIndex={defaults.allTaps.indexOf(defaults.taps)}
                      handleChange={(val) => this.handleTapsChange(val)}
                    />
                  ),
                },
                {
                  label: 'Cutoff frequency',
                  component: (
                    <ButtonCrement
                      options={defaults.allCutoffs}
                      handleChange={(val) => this.handleCutOffChange(val)}
                    />
                  ),
                },
              ]}
            />
          </LabInputSection>

          <LabInputSection>
            <LabGroup
              title="7. Thresholder"
              onGrpLaunch={() => this.switchGraph(6)}
              selected={this.state.currentGraph === 6}
              animated={this.state.currentGraph !== 6}
            />
          </LabInputSection>
          <LabInputSection>
            <LabGroup
              title="8. Decoder"
              onGrpLaunch={() => this.switchGraph(7)}
              selected={this.state.currentGraph === 7}
              animated={this.state.currentGraph !== 7}
            />
          </LabInputSection>
        </LabInputColumn>
      </LabInput>
    );
  }
}
