import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SimulatorInput from './SimulatorInput';
import SimulatorGraphs from '../components/SimulatorGraphs';
import { encHamming } from '../utils/encode';
import { decHamming } from '../utils/decode';
import sampleMsg from '../utils/sampleMsg';
import { modBPSK } from '../utils/modulate';
import getGraphParams from '../utils/getGraphParams';
import { doAWGN } from '../utils/impairment';
import { demodBPSK } from '../utils/demodulate';
import { lowPass } from '../utils/filter';
import defaults from '../config/defaults';
import threshold from '../utils/threshold';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: [[0, theme.spacing.unit * 2, theme.spacing.unit * 3]],
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  appHeader: {
    marginTop: theme.spacing.unit * 7,
    marginBottom: theme.spacing.unit * 3,
  },
});

class Simulator extends React.Component {
  state = {
    bits: defaults.bits,
    currentGraph: 0,
    cutoff: defaults.cutoff,
    enc: [],
    encType: defaults.encType,
    freq: defaults.Fs,
    graphs: null,
    impPower: defaults.impPower,
    impType: defaults.impType,
    mod: [],
    modType: defaults.modType,
    taps: defaults.taps,
  };

  computeGraphs() {
    try {
      // Get desired graphs from selected graph number
      const graphs = {
        0: this.getMsgGraphs,
        1: this.getEncGraphs,
        2: this.getModGraphs,
        3: this.getRecGraphs,
        4: this.getDemodGraphs,
        5: this.getFiltGraphs,
        6: this.getThreshGraphs,
        7: this.getDecGraphs,
      }[this.state.currentGraph]();

      this.setState({ graphs: graphs });
    } catch (error) {
      console.log(error);
      this.setState({ graphs: null });
    }
  }

  componentWillMount() {
    this.computeGraphs();
  }

  switchGraph = (name) => {
    this.setState({ currentGraph: name }, () => this.computeGraphs());
  };

  updateSimulator = (key, val) => {
    this.setState({ [key]: val }, () => this.computeGraphs());
  };

  doHamming = () => encHamming(this.state.bits, this.state.freq);
  modBPSK = () => modBPSK(this.doHamming());
  addImp = () => doAWGN(this.modBPSK(), this.state.impPower);
  demod = () => demodBPSK(this.doHamming(), this.addImp());
  filter = () => lowPass(this.demod(), this.state.taps, this.state.cutoff);
  thresh = () => threshold(this.filter());
  decode = () => decHamming(this.thresh());

  getMsgGraphs = () => {
    const samped = sampleMsg(this.state.bits, this.state.freq);
    this.setState({ samped: samped });
    return getGraphParams(samped, 'Input');
  };

  getEncGraphs = () => {
    if (this.state.encType !== 'hamm') {
      throw new Error('Invalid encoding type given.');
    }

    const enc = this.doHamming();
    this.setState({ enc: enc });
    return getGraphParams(enc, 'Encoded');
  };

  getModGraphs = () => {
    if (this.state.modType !== 'bpsk') {
      throw new Error('Invalid modulation type given.');
    }

    const mod = this.modBPSK();
    this.setState({ mod: mod });
    return getGraphParams(mod, 'Modulated');
  };

  getRecGraphs = () => {
    if (this.state.impType !== 'awgn') {
      throw new Error('Invalid impairment type given.');
    }

    if (Number.isNaN(+this.state.impPower)) {
      throw new Error('Invalid impairment power given.');
    }

    const rec = this.addImp();
    this.setState({ rec: rec });
    return getGraphParams(rec, 'Received');
  };

  getDemodGraphs = () => {
    if (this.state.modType !== 'bpsk') {
      throw new Error('Invalid modulation type given.');
    }

    const demod = this.demod();
    this.setState({ demod: demod });

    return getGraphParams(demod, 'Demodulated');
  };

  getFiltGraphs = () => {
    if (Number.isNaN(+this.state.taps) || Number.isNaN(this.state.cutoff)) {
      throw new Error('Invalid filter parameters given.');
    }

    const filtered = this.filter();
    this.setState({ filtered: filtered });
    return getGraphParams(filtered, 'Filtered');
  };

  getThreshGraphs = () => {
    const thresh = this.thresh();
    this.setState({ thresh: thresh });
    getGraphParams(this.thresh(), 'Threshold');
  };

  getDecGraphs = () => {
    if (this.state.modType !== 'bpsk') {
      throw new Error('Invalid modulation type given.');
    }

    const dec = this.decode();
    this.setState({ dec: dec })

    return getGraphParams(this.decode(), 'Decoded');
  };

  render() {
    console.log('Rendering simulator...');
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container justify="center">
            <Grid item md={10} xs={12}>
              <Typography variant="display1" className={classes.appHeader}>
                {'Simulator'}
              </Typography>
              <Grid container spacing={theme.spacing.unit * 2} justify="center">
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
        </main>
      </div>
    );
  }
}

Simulator.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Simulator);
