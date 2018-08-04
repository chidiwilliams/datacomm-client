import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bit4Input from './Bit4Input';
import defaults from '../config/defaults';
import ButtonCrement from './ButtonCrement';
import LabGroup from '../components/LabGroup';

class MessageInput extends Component {
  static propTypes = {
    updateBits: PropTypes.func,
    updateFreq: PropTypes.func,
    onGrpLaunch: PropTypes.func,
    selected: PropTypes.bool,
  };

  state = {
    freq: defaults.Fs,
  };

  updateBits = (val) => {
    this.setState({ bits: val }, () => this.props.updateBits(val));
  };

  updateFreq = (val) => {
    this.setState({ freq: val }, () => this.props.updateFreq(val));
  };

  render() {
    return (
      <div>
        <LabGroup
          title="Message input"
          onGrpLaunch={this.props.onGrpLaunch}
          selected={this.props.selected}
          inputs={[
            {
              label: 'Input bits',
              component: (
                <Bit4Input onChangeBits={(bits) => this.updateBits(bits)} />
              ),
            },
            {
              label: 'Sampling frequency',
              component: (
                <ButtonCrement
                  options={defaults.allFs}
                  handleChange={(val) => this.updateFreq(val)}
                  startIndex={defaults.allFs.indexOf(defaults.Fs)}
                />
              ),
            },
          ]}
        />
      </div>
    );
  }
}

export default MessageInput;
