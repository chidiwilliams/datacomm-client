import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import defaults from '../config/defaults';

const styles = (theme) => ({
  inputbit: {
    flex: 1,
    margin: theme.spacing.unit,
  },
  formSpace: {
    display: 'flex',
    margin: [[theme.spacing.unit, -theme.spacing.unit]],
  },
});

class Bit4Input extends Component {
  state = {
    bit1: defaults.bits[0],
    bit2: defaults.bits[1],
    bit3: defaults.bits[2],
    bit4: defaults.bits[3],
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.props.onChangeBits([
        this.state.bit1,
        this.state.bit2,
        this.state.bit3,
        this.state.bit4,
      ]);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.formSpace}>
          {Array.apply(null, Array(4)).map((x, i) => (
            <FormControl className={classes.inputbit} key={i}>
              <InputLabel htmlFor="bit1">Bit {i + 1}</InputLabel>
              <Select
                value={this.state[`bit${i + 1}`]}
                onChange={this.handleChange}
                inputProps={{
                  name: `bit${i + 1}`,
                  id: `bit${i + 1}`,
                }}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
              </Select>
            </FormControl>
          ))}
        </div>
      </div>
    );
  }
}

Bit4Input.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  onChangeBits: PropTypes.func,
  initBits: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(Bit4Input);
