import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SimulatorInput from './SimulatorInput/SimulatorInput';
import { Signal } from 'datacomm-lab';
import SimulatorGraphs from './SimulatorGraphs/SimulatorGraphs';

const styles = (theme) => ({
  appHeader: {
    marginTop: theme.spacing.unit * 7,
    marginBottom: theme.spacing.unit * 3,
  },
});

class Simulator extends Component {
  state = {
    freq: 2048,
    bits: '0000',
    hammed: '',
    currentGraph: 'message',
  };

  switchGraph = (name) => {
    this.setState({ currentGraph: name });
  };

  updateSimulator = (key, val) => {
    this.setState({ [key]: val });
  };

  getMessageGraphs() {
    // Compute time response
    // Get input bits
    const bi = new Signal(4);
    bi.signal = this.state.bits.split('').map(parseFloat);

    // Sample bits by provided Fs
    const ins = new Signal(this.state.freq);
    ins.signal = bi.sample(this.state.freq);
    const insx = Array.apply(null, Array(this.state.freq)).map((x, i) => i);

    // Compute frequency response
    const insfr = ins.getFrequencyResponse();
    const insfrx = Array.apply(null, Array(this.state.freq / 2 + 1)).map(
      (x, i) => i
    );

    return {
      t: {
        x: insx,
        y: ins.signal,
        tit: 'Input signal time response',
      },
      f: {
        x: insfrx,
        y: insfr,
        tit: 'Input signal frequency response',
        xmas: 128,
      },
    };
  }

  getGraphs() {
    return this.getMessageGraphs();
    // return this.state.currentGraph === 'message'
    // ? this.getMessageGraphs()
    // : null;
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={24} justify="center">
          <Grid item md={10} xs={12}>
            <Typography variant="display1" className={classes.appHeader}>
              {'Simulator'}
            </Typography>
            <Grid container spacing={24} justify="center">
              <Grid item md={6} xs={12}>
                <SimulatorInput
                  update={this.updateSimulator}
                  switchGraph={this.switchGraph}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <SimulatorGraphs
                  tGraph={this.getGraphs().t}
                  fGraph={this.getGraphs().f}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Simulator.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Simulator);
