import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ButtonSelect.css';
import Button from '../components/Button';

export default class ButtonSelect extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.array,
    defaultIndex: PropTypes.number,
  };

  state = {
    selected: this.props.defaultIndex || 0,
  };

  onChange = (id) => {
    this.setState({ selected: id }, () =>
      this.props.onChange(this.props.options[id])
    );
  };

  render() {
    return (
      <div className="selectMain">
        {this.props.options.map((x, i) => (
          <div className="btnP" key={i}>
            <Button
              text={x}
              onClick={() => this.onChange(i)}
              selected={this.state.selected === i}
            />
          </div>
        ))}
      </div>
    );
  }
}
