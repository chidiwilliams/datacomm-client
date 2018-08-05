import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ButtonCrement.css';
import Button from '../components/Button';
import ButtonDisplay from '../components/ButtonDisplay';

export default class ButtonCrement extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    startIndex: PropTypes.any,
    handleChange: PropTypes.func,
  };

  state = {
    selected: this.props.startIndex || 0,
  };

  handleChange = (val) => {
    if (this.props.handleChange) {
      this.props.handleChange(this.props.options[val]);
    }
  };

  increment = () => {
    // TODO: Shift click jumps 2 steps, ctrl click jumps 5
    // Hold to skip to end
    const newSel =
      this.state.selected < this.props.options.length - 1
        ? this.state.selected + 1
        : this.state.selected;
    this.setState({ selected: newSel }, () => this.handleChange(newSel));
  };

  decrement = () => {
    const newSel =
      this.state.selected > 0 ? this.state.selected - 1 : this.state.selected;
    this.setState({ selected: newSel }, () => this.handleChange(newSel));
  };

  render() {
    return (
      <div className="wrapper" style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Button
            text={'-'}
            onClick={this.decrement}
            selected={this.state.selected === 0}
          />
        </div>
        <div style={{ flex: 2 }}>
          <ButtonDisplay
            text={this.props.options[this.state.selected].toString()}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Button
            text={'+'}
            onClick={this.increment}
            selected={this.state.selected === this.props.options.length - 1}
          />
        </div>
      </div>
    );
  }
}
