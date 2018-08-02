import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SimulatorInput from '../components/SimulatorInput';
import SignalGenerator from './SignalGenerator';
import TestGraphs from './TestGraphs';
import './defaults.css';
import './Test.css';

const styles = (theme) => ({});

class Lab extends Component {
  state = {};

  render() {
    const { classes, theme } = this.props;

    return (
      <div className="main">
        <div className="container">
          <div className="osc">
            <div className="uprising">
              <div className="left">
                <TestGraphs />
              </div>
              <div className="right">
                <div className="labTitle">DataComm Laboratory</div>
                <div className="labAppTitle">Spectrometer</div>
                <div>
                  <SimulatorInput
                    heading={'Input'}
                    component={
                      <SignalGenerator
                      // handleTypeChange={(val) =>
                      // this.updateSpectrometer('waveshape', val)
                      // }
                      // handleFaChange={(val) => this.updateSpectrometer('fa', val)}
                      // handleFsChange={(val) => this.updateSpectrometer('fs', val)}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="oscShadow" />
        </div>
      </div>
    );
  }
}

Lab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Lab);
