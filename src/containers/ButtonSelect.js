import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ButtonSelect.css';
import Button from '../components/Button';

export default class ButtonSelect extends Component {
  static propTypes = {
    onChange: PropTypes.func,
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

  onChange = (name) => {
    this.setState({ selected: name }, () => this.props.onChange(name));
  };

  render() {
    return (
      <div className="selectMain">
        {this.opts.map((x, i) => (
          <div className="btnP" key={i}>
            <Button
              text={x.display}
              onClick={() => this.onChange(x.name)}
              selected={this.state.selected === x.name}
            />
          </div>
        ))}
      </div>
    );
  }
}
