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
import Channel from './Channel';

const styles = (theme) => ({
  formSection: {
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    position: 'relative',
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

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.root} autoComplete="off">
          <Paper className={classes.formSection}>
            <Typography variant="subheading" className={classes.subheader}>
              {'Message Input'}
            </Typography>
            <IconButton
              className={classes.launchIcon}
              onClick={() => this.props.switchGraph(0)}
              title={'Show graph'}
            >
              <LaunchIcon />
            </IconButton>
            <MessageInput updateMsg={this.handleMsgChange} />
          </Paper>

          <Grid container spacing={16} justify="center">
            <Grid item sm={6} xs={12}>
              <Paper className={classes.formSection}>
                <Typography variant="subheading" className={classes.subheader}>
                  {'Encoder'}
                </Typography>
                <IconButton
                  className={classes.launchIcon}
                  onClick={() => this.props.switchGraph(1)}
                  title={'Show graph'}
                >
                  <LaunchIcon />
                </IconButton>
                <Encoder handleEncChange={this.handleEncChange} />
              </Paper>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Paper className={classes.formSection}>
                <Typography variant="subheading" className={classes.subheader}>
                  {'Modulator'}
                </Typography>
                <IconButton
                  className={classes.launchIcon}
                  onClick={() => this.props.switchGraph(2)}
                  title={'Show graph'}
                >
                  <LaunchIcon />
                </IconButton>
                <Modulator handleModChange={this.handleModTypeChange} />
              </Paper>
            </Grid>
          </Grid>
          <Paper className={classes.formSection}>
            <Typography variant="subheading" className={classes.subheader}>
              {'Channel Impairment'}
            </Typography>
            <IconButton
              className={classes.launchIcon}
              onClick={() => this.props.switchGraph(3)}
              title={'Show graph'}
            >
              <LaunchIcon />
            </IconButton>
            <Channel />
          </Paper>
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
