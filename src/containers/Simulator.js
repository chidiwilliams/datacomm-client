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
    bits: '1010',
    hammed: '',
    enc: '',
    currentGraph: 0,
    graphs: null,
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

  getMsgGraphs() {
    const msg = sampleMsg(this.state.bits, this.state.freq);

    return {
      t: {
        x: msg.tx,
        y: msg.ty,
        tit: 'Input signal time response',
      },
      f: {
        x: msg.fx,
        y: msg.fy,
        tit: 'Input signal frequency response',
        xmas: 128,
      },
    };
  }

  getEncGraphs() {
    if (this.state.enc !== 'hamm') {
      throw new Error('Invalid encoding type given.');
    }

    const enc = doHamming(this.state.bits, this.state.freq);

    // Save Hamming-encoded signal to state for use for other utils
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

  getModGraphs() {
    if (this.state.mod !== 'bpsk') {
      throw new Error('Invalid modulation type given.');
    }

    const mod = doBPSK(this.state.hammed, this.state.freq);
    return {
      t: {
        x: mod.tx,
        y: mod.ty,
        tit: 'Modulated signal time response',
      },
      f: {
        x: mod.fx,
        y: mod.fy,
        tit: 'Modulated signal frequency response',
        xmas: 128,
      },
    };
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
