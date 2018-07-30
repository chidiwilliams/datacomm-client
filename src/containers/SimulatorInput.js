import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';
import MessageInput from './MessageInput';
import Encoder from './Encoder';
import Modulator from './Modulator';
import Grid from '@material-ui/core/Grid';
import Impairment from './Impairment';
import Filter from './Filter';

const styles = (theme) => ({
  formSection: {
    padding: theme.spacing.unit * 2,
    position: 'relative', // helps to position the 'show graph' btn
  },
  subheader: {
    fontWeight: 'bold',
  },
  launchIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

class SimulatorInput extends Component {
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

    const getSimulatorInput = ({ heading, id, component }) => (
      <Paper className={classes.formSection}>
        <Typography variant="subheading" className={classes.subheader}>
          {heading}
        </Typography>
        <IconButton
          className={classes.launchIcon}
          onClick={() => this.props.switchGraph(id)}
          title={'Show graph'}
        >
          <LaunchIcon />
        </IconButton>
        {component}
      </Paper>
    );

    return (
      <div>
        <form className={classes.root} autoComplete="off">
          <Grid container spacing={16} justify="center">
            <Grid item lg={7} xs={12}>
              {getSimulatorInput({
                heading: 'Message Input',
                id: 0,
                component: <MessageInput updateMsg={this.handleMsgChange} />,
              })}
            </Grid>

            <Grid item lg={5} xs={6}>
              {getSimulatorInput({
                heading: 'Encoder',
                id: 1,
                component: <Encoder handleEncChange={this.handleEncChange} />,
              })}
            </Grid>

            <Grid item lg={5} xs={6}>
              {getSimulatorInput({
                heading: 'Modulator',
                id: 2,
                component: (
                  <Modulator handleModChange={this.handleModTypeChange} />
                ),
              })}
            </Grid>

            <Grid item md={7} xs={12}>
              {getSimulatorInput({
                heading: 'Channel Impairment',
                id: 3,
                component: (
                  <Impairment
                    handleImpPowerChange={this.handleImpPowerChange}
                    handleImpTypeChange={this.handleImpTypeChange}
                  />
                ),
              })}
            </Grid>

            <Grid item md={5} sm={6} xs={6}>
              {getSimulatorInput({
                heading: 'Demodulator',
                id: 4,
              })}
            </Grid>

            <Grid item md={7} sm={6} xs={6}>
              {getSimulatorInput({
                heading: 'Low Pass Filter',
                id: 5,
                component: (
                  <Filter
                    handleCutoffChange={this.handleCutoffChange}
                    handleTapsChange={this.handleTapsChange}
                  />
                ),
              })}
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

SimulatorInput.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  update: PropTypes.func,
  switchGraph: PropTypes.func.isRequired,
  currentGraph: PropTypes.number,
};

export default withStyles(styles, { withTheme: true })(SimulatorInput);
