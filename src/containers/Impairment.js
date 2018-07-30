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

const defaultNoisePower = 1;

class Impairment extends Component {
  state = {
    type: '',
    powerError: false,
    power: defaultNoisePower,
  };

  handleSelectChange = (evt) => {
    const type = evt.target.value;
    this.setState({ type: type }, () => this.props.handleImpTypeChange(type));
  };

  handlePowerChange = (evt) => {
    // If the power is not a float, reject and add error to
    // text input
    if (Number.isNaN(+evt.target.value)) {
      this.setState({ powerError: true });
      return;
    }

    // If there's no error, and there was a previous error,
    // clear error var
    if (this.state.powerError) {
      this.setState({ powerError: false });
    }

    const power = +evt.target.value;

    // Save power
    this.setState({ power: power }, () =>
      this.props.handleImpPowerChange(power)
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={16} justify="center">
          <Grid item xs={7}>
            <div className={classes.formSpace}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="freq">Type</InputLabel>
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
          <Grid item xs={5}>
            <div className={classes.formSpace}>
              <TextField
                id={'power'}
                label={'Power'}
                className={classes.textField}
                error={this.state.powerError}
                defaultValue={defaultNoisePower}
                onChange={this.handlePowerChange}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Impairment.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleImpTypeChange: PropTypes.func,
  handleImpPowerChange: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(Impairment);
