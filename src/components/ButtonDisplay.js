import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ButtonDisplay extends Component {
  static propTypes = {
    text: PropTypes.string || PropTypes.number,
  };

  render() {
    return (
      <div
        style={{
          flex: 2,
          height: 40,
          lineHeight: '40px',
          width: '100%',
          background: '#101010',
          color: '#c80000',
          boxShadow: '0 7px 0 #060606, 0 8px 3px -1px rgba(0, 0, 0, 0.2)',
          zIndex: 3,
          fontWeight: 'bold',
          display: 'inline-block',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: 14,
        }}
      >
        {this.props.text}
      </div>
    );
  }
}
