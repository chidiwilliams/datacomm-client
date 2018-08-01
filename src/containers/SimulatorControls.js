import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MessageInput from './MessageInput';
import Encoder from './Encoder';
import Modulator from './Modulator';
import Grid from '@material-ui/core/Grid';
import Impairment from './Impairment';
import Filter from './Filter';
import SimulatorInput from '../components/SimulatorInput';

const styles = (theme) => ({});

class SimulatorControls extends Component {
  handleMsgChange = (type, val) => {
    this.props.update(type, val);
  };

  handleEncChange = (enc) => {
    this.props.update('encType', enc);
  };

  handleModTypeChange = (type) => {
    this.props.update('modType', type);
  };

  handleImpPowerChange = (pow) => {
    this.props.update('impPower', pow);
  };

  handleImpTypeChange = (type) => {
    this.props.update('impType', type);
  };

  handleCutoffChange = (freq) => {
    this.props.update('cutoff', freq);
  };

  handleTapsChange = (taps) => {
    this.props.update('taps', taps);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.root} autoComplete="off">
          <Grid container spacing={16} justify="center">
            <Grid item lg={7} xs={12}>
              <SimulatorInput
                heading="Message input"
                onLaunch={() => this.props.switchGraph(0)}
                component={<MessageInput updateMsg={this.handleMsgChange} />}
              />
            </Grid>

            <Grid item lg={5} xs={6}>
              <SimulatorInput
                heading="Encoder"
                onLaunch={() => this.props.switchGraph(1)}
                component={<Encoder handleEncChange={this.handleEncChange} />}
              />
            </Grid>

            <Grid item lg={5} xs={6}>
              <SimulatorInput
                heading="Modulator"
                onLaunch={() => this.props.switchGraph(2)}
                component={
                  <Modulator handleModChange={this.handleModTypeChange} />
                }
              />
            </Grid>

            <Grid item sm={7} xs={12}>
              <SimulatorInput
                heading="Channel Impairment"
                onLaunch={() => this.props.switchGraph(3)}
                component={
                  <Impairment
                    handleImpPowerChange={this.handleImpPowerChange}
                    handleImpTypeChange={this.handleImpTypeChange}
                  />
                }
              />
            </Grid>

            <Grid item sm={5} xs={12}>
              <SimulatorInput
                heading="Demodulator"
                onLaunch={() => this.props.switchGraph(4)}
              />
            </Grid>

            <Grid item lg={7} xs={12}>
              <SimulatorInput
                heading="Low Pass Filter"
                onLaunch={() => this.props.switchGraph(5)}
                component={
                  <Filter
                    handleCutoffChange={this.handleCutoffChange}
                    handleTapsChange={this.handleTapsChange}
                  />
                }
              />
            </Grid>

            <Grid item xs={6}>
              <SimulatorInput
                heading="Threshold Detector"
                onLaunch={() => this.props.switchGraph(6)}
              />
            </Grid>

            <Grid item xs={6}>
              <SimulatorInput
                heading="Decoder"
                onLaunch={() => this.props.switchGraph(7)}
              />
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

SimulatorControls.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  update: PropTypes.func,
  switchGraph: PropTypes.func.isRequired,
  currentGraph: PropTypes.number,
};

export default withStyles(styles, { withTheme: true })(SimulatorControls);
