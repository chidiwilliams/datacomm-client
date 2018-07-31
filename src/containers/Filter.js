import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import defaults from '../config/defaults';

const styles = (theme) => ({
  textField: {
    flex: 1,
    margin: theme.spacing.unit,
  },
  formSpace: {
    display: 'flex',
    margin: [[theme.spacing.unit, -theme.spacing.unit]],
  },
});

class Filter extends Component {
  state = {
    cutoff: defaults.cutoff,
    cutoffError: false,
    taps: defaults.taps,
    tapsError: false,
  };

  handleChange(evt, param, error, prop) {
    // If the value isNaN, reject and add error to text input
    if (Number.isNaN(+evt.target.value)) {
      this.setState({ [error]: true });
      return;
    }

    // If there's no error, and there was a previous error,
    // clear error var
    if (this.state[error]) {
      this.setState({ [error]: false });
    }

    const val = +evt.target.value;
    this.setState({ [param]: val }, () => prop(val));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.formSpace}>
        <TextField
          id={'freq'}
          label={'Cutoff frequency'}
          className={classes.textField}
          error={this.state.cutoffError}
          defaultValue={defaults.cutoff}
          onChange={(evt) =>
            this.handleChange(
              evt,
              'cutoff',
              'cutoffError',
              this.props.handleCutoffChange
            )
          }
        />
        <TextField
          id={'taps'}
          label={'Number of taps'}
          className={classes.textField}
          error={this.state.tapsError}
          defaultValue={defaults.taps}
          onChange={(evt) =>
            this.handleChange(
              evt,
              'taps',
              'tapsError',
              this.props.handleTapsChange
            )
          }
        />
      </div>
    );
  }
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleCutoffChange: PropTypes.func,
  handleTapsChange: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(Filter);
