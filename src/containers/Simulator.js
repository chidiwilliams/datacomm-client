import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SimulatorInput from './SimulatorInput';
import SimulatorGraphs from '../components/SimulatorGraphs';
import { doHamming } from '../utils/graphing/encode';
import sampleMsg from '../utils/graphing/sampleMsg';
import { doBPSK } from '../utils/graphing/modulate';
import returner from '../utils/returner';

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
    hammed: '',
    encType: '',
    enc: [],
    modType: '',
    mod: [],
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

  getGraphObj(obj, name) {
    return {
      t: {
        x: obj.tx,
        y: obj.ty,
        tit: name + ' signal time response',
      },
      f: {
        x: obj.fx,
        y: obj.fy,
        tit: name + ' signal frequency response',
        xmas: 128,
      },
    };
  }

  doSample() {
    const samped = sampleMsg(this.state.bits, this.state.freq);
    this.setState({ samped: samped });
    return samped;
  }

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

  getMsgGraphs() {
    const samped = this.doSample();
    return this.getGraphObj(returner(samped), 'Input');
  }

  getEncGraphs() {
    if (this.state.encType !== 'hamm') {
      throw new Error('Invalid encoding type given.');
    }

    const hammed = this.doHamming();
    return this.getGraphObj(returner(hammed), 'Encoded');
  }

  getModGraphs() {
    if (this.state.modType !== 'bpsk') {
      throw new Error('Invalid modulation type given.');
    }

    const mod = this.doBPSK();
    return this.getGraphObj(returner(mod), 'Modulated');
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
