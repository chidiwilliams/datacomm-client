import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Graph from './SimulatorGraphs/Graph/Graph';
import SimulatorInput from './SimulatorInput/SimulatorInput';

const styles = (theme) => ({
  appHeader: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 3,
  },
  paddedBox: {
    padding: theme.spacing.unit * 2,
  },
  formSection: {
    marginBottom: theme.spacing.unit * 4,
  },
  subheader: {
    fontWeight: 'bold',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class Simulator extends Component {
  state = {
    freq: 2048,
    bits: '0000',
    enc: 'hamm',
    mod: 'bpsk',
  };

  updateGraph = (sect) => {
    alert('Hello');
  };

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
                  setFreq={(freq) => this.setState({ freq })}
                  setBits={(bits) => this.setState({ bits })}
                  setEnc={(enc) => this.setState({ enc })}
                  setMod={(mod) => this.setState({ mod })}
                  updateGraph={this.updateGraph}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Paper className={classes.paddedBox}>
                  <div>
                    <Graph
                      title={'Noise signal time response'}
                      xinput={Array.apply(null, Array(4)).map((x, i, a) => i)}
                      yinput={Array.apply(null, Array(4)).map((x, i) =>
                        Math.random()
                      )}
                      id={1}
                    />
                  </div>
                  <div>
                    <Graph
                      title={'Noise signal frequency response'}
                      xinput={Array.apply(null, Array(4)).map((x, i, a) => i)}
                      yinput={Array.apply(null, Array(4)).map((x, i) =>
                        Math.random()
                      )}
                      id={2}
                    />
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td>Freq</td>
                        <td>{this.state.freq}</td>
                      </tr>
                      <tr>
                        <td>Bits</td>
                        <td>{this.state.bits}</td>
                      </tr>
                      <tr>
                        <td>Encoder</td>
                        <td>{this.state.enc}</td>
                      </tr>
                      <tr>
                        <td>Modulator</td>
                        <td>{this.state.mod}</td>
                      </tr>
                    </tbody>
                  </table>
                </Paper>
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
