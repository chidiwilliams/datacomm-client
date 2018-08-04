import React, { Component } from 'react';

export default class LabInput extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginLeft: -5,
          marginRight: -5,
          flexWrap: 'wrap',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
