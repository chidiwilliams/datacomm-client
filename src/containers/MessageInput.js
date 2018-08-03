import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bit4Input from './Bit4Input';
import defaults from '../config/defaults';
import ButtonCrement from './ButtonCrement';

class MessageInput extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    updateBits: PropTypes.func,
    updateFreq: PropTypes.func,
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
    const { classes } = this.props;

    return (
      <div>
        <Bit4Input onChangeBits={(bits) => this.updateBits(bits)} />
        <ButtonCrement
          options={defaults.allFs}
          handleChange={(val) => this.updateFreq(val)}
          startIndex={defaults.allFs.indexOf(defaults.Fs)}
        />
      </div>
    );
  }
}

export default MessageInput;
