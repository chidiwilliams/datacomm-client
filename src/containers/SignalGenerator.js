import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import defaults from '../config/defaults';
import ButtonSelect from './ButtonSelect';
import ButtonSwitch from './ButtonSwitch';
import './SignalGenerator.css';

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
        <div className="sgInput">
          <div className="selectLabel">Waveshape</div>
          <ButtonSelect
            onChange={(val) =>
              this.handleSelectChange(
                'waveshape',
                val,
                this.props.handleTypeChange
              )
            }
          />
        </div>

        <div className="sgInput">
          <div className="selectLabel">Signal frequency</div>
          <ButtonSwitch
            options={defaults.allFa}
            startIndex={defaults.allFa.indexOf(defaults.Fa)}
            handleChange={(val) =>
              this.handleSelectChange('fa', val, this.props.handleFaChange)
            }
          />
        </div>
        <div className="sgInput">
          <div className="selectLabel">Sampling frequency</div>
          <ButtonSwitch
            options={defaults.allFs}
            startIndex={defaults.allFs.indexOf(defaults.Fs)}
            handleChange={(val) =>
              this.handleSelectChange('fs', val, this.props.handleFsChange)
            }
          />
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
