import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaults from '../config/defaults';
import Button from './Button';

class Bit4Input extends Component {
  static propTypes = {
    onChangeBits: PropTypes.func,
    initBits: PropTypes.string,
  };

  state = {
    bit0: defaults.bits[0],
    bit1: defaults.bits[1],
    bit2: defaults.bits[2],
    bit3: defaults.bits[3],
  };

  handleChange = (i) => {
    const bitno = `bit${i}`;
    // Toggle button state
    this.setState({ [bitno]: 1 - this.state[bitno] }, () =>
      this.props.onChangeBits([
        this.state.bit0,
        this.state.bit1,
        this.state.bit2,
        this.state.bit3,
      ])
    );
  };

  render() {
    return (
      <div className="bit4inputs" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Array.apply(null, Array(4)).map((x, i) => (
          <div style={{ flex: '1 50px' }}>
            <Button
              key={i}
              text={`Bit ${i}`}
              // Check corresponding bit value in state
              // Convert to opp. boolean
              selected={!this.state[`bit${i}`]}
              onClick={() => this.handleChange(i)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Bit4Input;
