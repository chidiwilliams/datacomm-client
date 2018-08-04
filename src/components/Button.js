import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default class Button extends Component {
  static propTypes = {
    text: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
  };

  render() {
    return (
      <button
        className={this.props.selected ? 'button selected' : 'button'}
        onClick={this.props.onClick}
      >
        <span>{this.props.text}</span>
      </button>
    );
  }
}
