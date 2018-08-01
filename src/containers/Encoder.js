import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import defaults from '../config/defaults';

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

class Encoder extends Component {
  state = {
    type: defaults.encType,
  };

  handleSelectChange = (evt) => {
    const val = evt.target.value;
    this.setState({ type: val }, () => {
      this.props.handleEncChange(val);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.formSpace}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="enc">Scheme</InputLabel>
          <Select
            value={this.state.type}
            onChange={this.handleSelectChange}
            inputProps={{
              name: 'enc',
              id: 'enc',
            }}
          >
            <MenuItem value={'hamm'}>Hamming (7,4)</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

Encoder.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleEncChange: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(Encoder);