import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';

const styles = (theme) => ({
  formControl: {
    flex: 1,
    margin: theme.spacing.unit,
  },
  textField: {
    flex: 1,
    margin: theme.spacing.unit,
  },
  formSpace: {
    display: 'flex',
    margin: [[theme.spacing.unit, -theme.spacing.unit]],
  },
});

class Channel extends Component {
  state = {
    type: '',
    powerError: false,
    impower: null,
  };

  handleSelectChange = (evt) => {
    this.setState({ type: evt.target.value });
  };

  handlePowerChange = (evt) => {
    // If the power is not a float, reject and add error to
    // text input
    if (!/^\d+(.\d+)?$/.exec(evt.target.value)) {
      this.setState({ powerError: true });
      return;
    }

    // If there's no error, and there was a previous error,
    // clear error var
    if (this.state.powerError) {
      this.setState({ powerError: false });
    }

    // Save power
    this.setState({ impower: parseFloat(evt.target.value) });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={16} justify="center">
          <Grid item xs={8}>
            <div className={classes.formSpace}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="freq">Impairment type</InputLabel>
                <Select
                  value={this.state.type}
                  onChange={this.handleSelectChange}
                  inputProps={{
                    name: 'imp',
                    id: 'imp',
                  }}
                >
                  <MenuItem value={'awgn'}>AWGN</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.formSpace}>
              <TextField
                id={'impower'}
                label={'Impairment power'}
                className={classes.textField}
                error={this.state.powerError}
                defaultValue={1}
                onChange={this.handlePowerChange}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Channel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Channel);
