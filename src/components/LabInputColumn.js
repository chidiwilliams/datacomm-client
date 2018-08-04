import React, { Component } from 'react';

export default class LabInputColumn extends Component {
  render() {
    return (
      <div
        style={{
          flex: 1,
          paddingLeft: 5,
          paddingRight: 5,
          marginTop: -5,
          marginBottom: -5,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
