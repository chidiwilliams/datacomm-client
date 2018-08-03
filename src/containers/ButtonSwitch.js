import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ButtonSwitch.css';
import Button from './Button';

export default class ButtonSwitch extends Component {
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
      <div className="wrapper">
        <div className="bbtn">
          <Button
            text={'-'}
            onClick={this.decrement}
            selected={this.state.selected === 0}
          />
        </div>
        <div className="display">{this.props.options[this.state.selected]}</div>
        <div className="bbtn">
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
