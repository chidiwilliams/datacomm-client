import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaults from '../config/defaults';
import ButtonSelect from './ButtonSelect';
import ButtonCrement from './ButtonCrement';
import LabGroup from '../components/LabGroup';

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
    return (
      <div>
        <LabGroup
          title="Spectrometer"
          inputs={[
            {
              label: 'Waveshape',
              component: (
                <ButtonSelect
                  onChange={(val) =>
                    this.handleSelectChange(
                      'waveshape',
                      val,
                      this.props.handleTypeChange
                    )
                  }
                />
              ),
            },
            {
              label: 'Signal frequency',
              component: (
                <ButtonCrement
                  options={defaults.allFa}
                  startIndex={defaults.allFa.indexOf(defaults.Fa)}
                  handleChange={(val) =>
                    this.handleSelectChange(
                      'fa',
                      val,
                      this.props.handleFaChange
                    )
                  }
                />
              ),
            },
            {
              label: 'Sampling frequency',
              component: (
                <ButtonCrement
                  options={defaults.allFs}
                  startIndex={defaults.allFs.indexOf(defaults.Fs)}
                  handleChange={(val) =>
                    this.handleSelectChange(
                      'fs',
                      val,
                      this.props.handleFsChange
                    )
                  }
                />
              ),
            },
          ]}
        />
      </div>
    );
  }
}

SignalGenerator.propTypes = {
  handleTypeChange: PropTypes.func.isRequired,
  handleFaChange: PropTypes.func.isRequired,
  handleFsChange: PropTypes.func.isRequired,
};

export default SignalGenerator;
