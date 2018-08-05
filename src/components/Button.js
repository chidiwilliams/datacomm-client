import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default class Button extends Component {
  static propTypes = {
    text: PropTypes.string,
    selected: PropTypes.bool,
    animated: PropTypes.bool,
    onClick: PropTypes.func,
    style: PropTypes.object,
  };

  render() {
    const classes = ['button'];
    this.props.selected ? classes.push('selected') : null;
    this.props.animated ? classes.push('bouncing') : null;

    return (
      <button
        className={classes.join(' ')}
        onClick={this.props.onClick}
        style={{ ...this.props.style }}
      >
        <span>{this.props.text}</span>
      </button>
    );
  }
}
