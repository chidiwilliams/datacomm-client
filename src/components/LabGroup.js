import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LabGroup.css';

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
        <button
          className={
            this.props.selected ? 'specGrpTrigger selected' : 'specGrpTrigger'
          }
          onClick={(evt) => {
            if (this.props.onGrpLaunch) this.props.onGrpLaunch(evt);
          }}
        >
          >>
        </button>
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
