import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SimulatorInput from './SimulatorInput';
import SimulatorGraphs from '../components/SimulatorGraphs';
import { doHamming } from '../utils/encode';
import sampleMsg from '../utils/sampleMsg';
import { doBPSK } from '../utils/modulate';
import getGraphParams from '../utils/getGraphParams';
import { doAWGN } from '../utils/impairment';

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
    freq: 2048,
    bits: [1, 0, 1, 0],
    encType: '',
    enc: [],
    modType: '',
    mod: [],
    currentGraph: 0,
    graphs: null,
    impType: '',
    impPower: 1,
  };

  storeGraphs() {
    try {
      this.setState({ graphs: this.getGraphs() });
    } catch (error) {
      console.log(error);
      this.setState({ graphs: null });
    }
  }

  componentWillMount() {
    this.storeGraphs();
  }

  switchGraph = (name) => {
    this.setState({ currentGraph: name }, () => this.storeGraphs());
  };

  updateSimulator = (key, val) => {
    this.setState({ [key]: val }, () => this.storeGraphs());
  };

  doHamming() {
    const enc = doHamming(this.state.bits, this.state.freq);
    this.setState({ enc: enc });
    return enc;
  }

  doBPSK() {
    const mod = doBPSK(this.doHamming());
    this.setState({ mod: mod });
    return mod;
  }

  addImp() {
    const rec = doAWGN(this.doBPSK(), this.state.impPower);
    this.setState({ rec: rec });
    return rec;
  }

  getMsgGraphs() {
    const samped = sampleMsg(this.state.bits, this.state.freq);
    this.setState({ samped: samped });
    return getGraphParams(samped, 'Input');
  }

  getEncGraphs() {
    if (this.state.encType !== 'hamm') {
      throw new Error('Invalid encoding type given.');
    }

    return getGraphParams(this.doHamming(), 'Encoded');
  }

  getModGraphs() {
    if (this.state.modType !== 'bpsk') {
      throw new Error('Invalid modulation type given.');
    }

    return getGraphParams(this.doBPSK(), 'Modulated');
  }

  getRecGraphs() {
    if (this.state.impType !== 'awgn') {
      throw new Error('Invalid impairment type given.');
    }

    if (Number.isNaN(+this.state.impPower)) {
      throw new Error('Invalid impairment power given.');
    }

    return getGraphParams(this.addImp(), 'Received');
  }

  getGraphs() {
    switch (this.state.currentGraph) {
      case 0:
        return this.getMsgGraphs();
      case 1:
        return this.getEncGraphs();
      case 2:
        return this.getModGraphs();
      case 3:
        return this.getRecGraphs();
      default:
        throw new Error('Invalid current graph number.');
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
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
