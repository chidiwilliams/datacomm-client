import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

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

class Modulator extends Component {
  state = {
    type: this.props.initType || 'bpsk',
  };

  handleSelectChange = (evt) => {
    const val = evt.target.value;
    this.setState({ type: val }, () => {
      this.props.handleModChange(val);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.formSpace}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="freq">Modulation scheme</InputLabel>
            <Select
              value={this.state.type}
              onChange={this.handleSelectChange}
              inputProps={{
                name: 'mod',
                id: 'mod',
              }}
            >
              <MenuItem value={'bpsk'}>BPSK</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
}

Modulator.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleModChange: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(Modulator);
