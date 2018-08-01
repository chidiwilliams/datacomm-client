import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppHeader from '../components/AppHeader';
import SimulatorInput from '../components/SimulatorInput';
import SimulatorGraphs from '../components/SimulatorGraphs';
import { Grid } from '@material-ui/core';
import SignalGenerator from './SignalGenerator';
import defaults from '../config/defaults';
import generateWave from '../utils/generateWave';
import getGraphParams from '../utils/getGraphParams';

const styles = (theme) => ({});

class Spectrometer extends Component {
  state = {
    waveshape: 'sine',
    fs: defaults.Fs,
    fa: defaults.Fa,
    graphs: { t: null, f: null },
  };

  updateSpectrometer = (key, val) => {
    this.setState({ [key]: val }, () => this.computeGraphs());
  };

  computeGraphs = () => {
    const graphs = getGraphParams(
      generateWave(this.state.waveshape, this.state.fs, this.state.fa),
      'Hello'
    );

    this.setState({ graphs: graphs });
  };

  componentWillMount() {
    this.computeGraphs();
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        <AppHeader text={'Spectrometer'} />
        <Grid container spacing={theme.spacing.unit * 2} justify="center">
          <Grid item md={6} xs={12}>
            <SimulatorInput
              heading={'Input'}
              component={
                <SignalGenerator
                  handleTypeChange={(val) =>
                    this.updateSpectrometer('waveshape', val)
                  }
                  handleFaChange={(val) => this.updateSpectrometer('fa', val)}
                  handleFsChange={(val) => this.updateSpectrometer('fs', val)}
                />
              }
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SimulatorGraphs
              tGraph={this.state.graphs.t}
              fGraph={this.state.graphs.f}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Spectrometer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Spectrometer);
