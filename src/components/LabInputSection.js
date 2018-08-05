import React, { Component } from 'react';

export default class LabInputSection extends Component {
  render() {
    return (
      <div
        style={{
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
