import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ButtonSelect.css';

export default class ButtonSelect extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    // prop: PropTypes
  };

  state = {
    selected: 'sine',
  };

  // TODO: Change displays to svgs
  opts = [
    {
      name: 'sine',
      display: 'Sine',
    },
    {
      name: 'square',
      display: 'Square',
    },
    {
      name: 'triangular',
      display: 'Triangular',
    },
  ];

  onChange = (evt) => {
    const name = evt.currentTarget.name;
    this.setState({ selected: name }, () => this.props.onChange(name));
  };

  render() {
    return (
      <div className="selectMain">
        {this.opts.map((x, i) => (
          <div className="btnP">
            <button
              className={
                x.name === this.state.selected ? 'button selected' : 'button'
              }
              name={x.name}
              onClick={this.onChange}
            >
              <span>{x.display}</span>
            </button>
          </div>
        ))}
      </div>
    );
  }
}
