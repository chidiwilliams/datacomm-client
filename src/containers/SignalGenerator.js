import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import defaults from '../config/defaults';
import ButtonSelect from './ButtonSelect';

const styles = (theme) => ({
  formControl: {
    flex: 1,
    margin: theme.spacing.unit,
  },
  formSpace: {
    display: 'flex',
    margin: [[theme.spacing.unit, -theme.spacing.unit]],
  },
});

class SignalGenerator extends Component {
  state = {
    waveshape: defaults.waveshape,
    fs: defaults.Fs,
    fa: defaults.Fa,
  };

  handleSelectChange = (param, val, cb) => {
    this.setState({ [param]: val }, () => cb(val));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <ButtonSelect />
        <div className={classes.formSpace}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="freq">Wave shape</InputLabel>
            <Select
              value={this.state.waveshape}
              onChange={(evt) =>
                this.handleSelectChange(
                  'waveshape',
                  evt.target.value,
                  this.props.handleTypeChange
                )
              }
              inputProps={{
                name: 'waveshape',
                id: 'waveshape',
              }}
            >
              {defaults.allWaveshapes.slice().map((x, i) => (
                <MenuItem value={x} key={i}>
                  {x
                    .split('')
                    .map((x, i) => (!i ? x.toUpperCase() : x))
                    .join('')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="freq">Sampling frequency</InputLabel>
            <Select
              value={this.state.fs}
              onChange={(evt) =>
                this.handleSelectChange(
                  'fs',
                  evt.target.value,
                  this.props.handleFsChange
                )
              }
              inputProps={{
                name: 'fs',
                id: 'fs',
              }}
            >
              {defaults.allFs.slice().map((x, i) => (
                <MenuItem value={x} key={i}>
                  {x}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="freq">Signal frequency</InputLabel>
            <Select
              value={this.state.fa}
              onChange={(evt) =>
                this.handleSelectChange(
                  'fa',
                  evt.target.value,
                  this.props.handleFaChange
                )
              }
              inputProps={{
                name: 'da',
                id: 'da',
              }}
            >
              {defaults.allFa.slice().map((x, i) => (
                <MenuItem value={x} key={i}>
                  {x}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
}

SignalGenerator.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  handleFaChange: PropTypes.func.isRequired,
  handleFsChange: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(SignalGenerator);
