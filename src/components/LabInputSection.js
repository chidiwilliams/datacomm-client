import React, { Component } from 'react';

export default class LabInputSection extends Component {
  render() {
    return (
      <div
        style={{
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
