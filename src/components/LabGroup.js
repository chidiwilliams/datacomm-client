import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LabGroup.css';
import Button from './Button';

export default class LabGroup extends Component {
  static propTypes = {
    title: PropTypes.string,
    onGrpLaunch: PropTypes.func,
    selected: PropTypes.bool,
    // TODO: Tighten reqs
    inputs: PropTypes.array,
  };

  render() {
    return (
      <div className="specGrp">
        <div className="specGrpLabel">{this.props.title}</div>
        <div
          className="trigger"
          style={{ position: 'absolute', top: -12, right: 5 }}
        >
          <Button
            text={'>>'}
            style={{ height: 20, width: 60 }}
            selected={this.props.selected}
            onClick={(evt) => {
              if (this.props.onGrpLaunch) this.props.onGrpLaunch(evt);
            }}
          />
        </div>
        {this.props.inputs
          ? this.props.inputs.map((x, i) => (
              <div className="specInput" key={i}>
                <div className="specLabel">{x.label}</div>
                {x.component}
              </div>
            ))
          : null}
      </div>
    );
  }
}
