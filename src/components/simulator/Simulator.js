import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SimulatorInput from './SimulatorInput/SimulatorInput';
import { Signal, Hamming4 } from 'datacomm-lab';
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
    bits: '1010',
    hammed: '',
    enc: '',
    currentGraph: 0,
    graphs: null,
  };

  componentWillMount() {
    try {
      const graphs = this.getGraphs();
      this.setState({ graphs: graphs });
    } catch (error) {
      this.setState({ graphs: null });
    }
  }

  switchGraph = (name) => {
    this.setState({ currentGraph: name }, () => {
      try {
        const graphs = this.getGraphs();
        console.log('Trying...', graphs);
        this.setState({ graphs: graphs });
      } catch (error) {
        this.setState({ graphs: null });
      }
    });
  };

  updateSimulator = (key, val) => {
    this.setState({ [key]: val }, () => {
      try {
        const graphs = this.getGraphs();
        this.setState({ graphs: graphs });
      } catch (error) {
        this.setState({ graphs: null });
      }
    });
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

  getEncGraphs() {
    if (this.state.enc === 'hamm') {
      // Hamming encoding
      // Get time response
      const bi = new Signal(4);
      bi.signal = this.state.bits.split('').map(parseFloat);

      const hammed = new Signal(8);
      hammed.signal = new Hamming4().encode(bi.signal, true);
      const hamm = new Signal(this.state.freq);
      hamm.signal = hammed.sample(this.state.freq);
      const hammedx = Array.apply(null, Array(this.state.freq)).map(
        (x, i) => i
      );

      // Get frequency response
      const hammedfr = hamm.getFrequencyResponse();
      const hammedfrx = Array.apply(null, Array(this.state.freq / 2 + 1)).map(
        (x, i) => i
      );

      return {
        t: {
          x: hammedx,
          y: hamm.signal,
          tit: 'Encoded signal time response',
        },
        f: {
          x: hammedfrx,
          y: hammedfr,
          tit: 'Encoded signal frequency response',
          xmas: 128,
        },
      };
    }
  }

  getGraphs() {
    switch (this.state.currentGraph) {
      case 0:
        return this.getMessageGraphs();
      case 1:
        return this.getEncGraphs();
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
