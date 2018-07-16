import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Bit4Input from './Bit4Input/Bit4Input';

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
    freq: this.props.initFreq || 128,
    bits: this.props.initBits || '0000',
  };

  handleSelectChange = (evt) => {
    this.setState({ freq: evt.target.value }, () => {
      this.props.handleMsgChange('freq', evt.target.value);
    });
  };

  handleBitsChange = (bits) => {
    this.setState({ bits: bits }, () => {
      this.props.handleMsgChange('bits', bits);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Bit4Input onChangeBits={this.handleBitsChange} />

        <div className={classes.formSpace}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="freq">Sampling frequency</InputLabel>
            <Select
              value={this.state.freq}
              onChange={this.handleSelectChange}
              inputProps={{
                name: 'freq',
                id: 'freq',
              }}
            >
              {freqs.slice(0).map((x, i) => <MenuItem value={x}>{x}</MenuItem>)}
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
  handleMsgChange: PropTypes.object,
  initFreq: PropTypes.object,
  initBits: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(MessageInput);
