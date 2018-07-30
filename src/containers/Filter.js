import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

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

const defaultCutoff = 8;

class Filter extends Component {
  state = {
    cutoffError: false,
    cutoff: defaultCutoff,
  };

  handleCutoffChange = (evt) => {
    // If the power is not a float, reject and add error to
    // text input
    if (Number.isNaN(+evt.target.value)) {
      this.setState({ cutoffError: true });
      return;
    }

    // If there's no error, and there was a previous error,
    // clear error var
    if (this.state.cutoffError) {
      this.setState({ cutoffError: false });
    }

    const cutoff = +evt.target.value;
    this.setState({ cutoff: cutoff }, () =>
      this.props.handleCutoffChange(cutoff)
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.formSpace}>
        <TextField
          id={'freq'}
          label={'Cutoff frequency'}
          className={classes.textField}
          error={this.state.cutoffError}
          defaultValue={defaultCutoff}
          onChange={this.handleCutoffChange}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleCutoffChange: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(Filter);
