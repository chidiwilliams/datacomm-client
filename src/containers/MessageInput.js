import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Bit4Input from './Bit4Input';

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

const freqs = [128, 256, 512, 1024, 2048];

class MessageInput extends Component {
  state = {
    freq: 2048,
  };

  updateMsg = (type, val) => {
    this.setState({ [type]: val }, () => this.props.updateMsg(type, val));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Bit4Input onChangeBits={(bits) => this.updateMsg('bits', bits)} />

        <div className={classes.formSpace}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="freq">Sampling frequency</InputLabel>
            <Select
              value={this.state.freq}
              onChange={(evt) => this.updateMsg('freq', evt.target.value)}
              inputProps={{
                name: 'freq',
                id: 'freq',
              }}
            >
              {freqs.slice(0).map((x, i) => (
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

MessageInput.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  updateMsg: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(MessageInput);
