import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SimulatorInput from './SimulatorInput/SimulatorInput';
import * as lab from 'datacomm-lab';
import SimulatorGraphs from './SimulatorGraphs/SimulatorGraphs';
import hammingEncode from '../../functions/hammingEncode';

const styles = (theme) => ({
  appHeader: {
    marginTop: theme.spacing.unit * 7,
    marginBottom: theme.spacing.unit * 3,
  },
});

class Simulator extends Component {
  state = {
    freq: 2048,
    bits: '1010',
    hammed: '',
    enc: '',
    currentGraph: 0,
    graphs: null,
  };

  saveGraphs() {
    try {
      this.setState({ graphs: this.getGraphs() });
    } catch (error) {
      console.log(error);
      this.setState({ graphs: null });
    }
  }

  componentWillMount() {
    this.saveGraphs();
  }

  switchGraph = (name) => {
    this.setState({ currentGraph: name });
  };

  updateSimulator = (key, val) => {
    this.setState({ [key]: val }, () => this.saveGraphs());
  };

  getMsgGraphs() {
    // Compute time response
    // Get input bits
    const bi = new lab.Signal(4);
    bi.signal = this.state.bits.split('').map(parseFloat);

    // Sample bits by provided Fs
    const ins = new lab.Signal(this.state.freq);
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

  getEncGraphs() {
    if (this.state.enc === 'hamm') {
      const enc = hammingEncode(this.state.bits, this.state.freq);

      // Save Hamming-encoded signal to state for use for other functions
      this.setState({ hammed: enc.hammed });

      return {
        t: {
          x: enc.tx,
          y: enc.ty,
          tit: 'Encoded signal time response',
        },
        f: {
          x: enc.fx,
          y: enc.fy,
          tit: 'Encoded signal frequency response',
          xmas: 128,
        },
      };
    }
  }

  getModGraphs() {
    // Get message signal
    const hammed = new lab.Signal(8);
    hammed.signal = this.state.hammed.split('').map(parseFloat);

    const msg = new lab.Signal(this.state.freq);
    msg.signal = hammed.sample(this.state.freq);

    const carr = new lab.WaveSignal(
      lab.WaveSignalType.SINE,
      this.state.freq,
      8
    );

    const bpsk = new lab.BPSK(msg.signal, carr.signal);
  }

  getGraphs() {
    switch (this.state.currentGraph) {
      case 0:
        return this.getMsgGraphs();
      case 1:
        return this.getEncGraphs();
      case 2:
        return this.getModGraphs();
      default:
        throw new Error('Invalid current graph number.');
    }
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
                  currentGraph={this.state.currentGraph}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {this.state.graphs ? (
                  <SimulatorGraphs
                    tGraph={this.state.graphs.t}
                    fGraph={this.state.graphs.f}
                  />
                ) : (
                  <div>Cannot plot graph.</div>
                )}
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
