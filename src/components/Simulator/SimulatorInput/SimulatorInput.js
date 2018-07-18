import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MessageInput from './MessageInput/MessageInput';
import Paper from '@material-ui/core/Paper';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';
import Encoder from './Encoder/Encoder';
import Modulator from './Modulator/Modulator';

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
  initFreq = 2048;
  initBits = '0000';

  state = {
    isMsgGraphDisabled: true,
    isEncGraphDisabled: true,
    isModGraphDisabled: true,
  };

  handleModTypeChange = (type) => {
    this.props.update('mod', type);
    this.props.switchGraph('mod');
  };

  componentWillUpdate(prevProps) {
    if (this.props.currentGraph !== prevProps.currentGraph) {
      if (this.props.currentGraph === 'message') {
        this.setState({ isMsgGraphDisabled: true });
      } else if (this.props.currentGraph === 'enc') {
        this.setState({ isEncGraphDisabled: true });
      } else if (this.props.currentGraph === 'mod') {
        this.setState({ isModGraphDisabled: true });
      }
    }
  }

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
              onClick={() => this.props.switchGraph('message')}
              disabled={this.state.isMsgGraphDisabled}
            >
              <LaunchIcon />
            </IconButton>
            <MessageInput
              setFreq={(freq) => this.props.update('freq', freq)}
              setBits={(bits) => this.props.update('bits', bits)}
              initFreq={this.initFreq}
              initBits={this.initBits}
            />
          </Paper>
          <Paper className={classes.formSection}>
            <Typography variant="subheading" className={classes.subheader}>
              {'Encoder'}
            </Typography>
            <IconButton
              className={classes.launchIcon}
              onClick={() => this.props.switchGraph('enc')}
              disabled={this.state.isEncGraphDisabled}
            >
              <LaunchIcon />
            </IconButton>
            <Encoder handleEncChange={(enc) => this.props.update('enc', enc)} />
          </Paper>
          <Paper className={classes.formSection}>
            <Typography variant="subheading" className={classes.subheader}>
              {'Modulator'}
            </Typography>
            <IconButton
              className={classes.launchIcon}
              onClick={() => this.props.switchGraph('mod')}
              disabled={this.state.isModGraphDisabled}
            >
              <LaunchIcon />
            </IconButton>
            <Modulator handleModChange={this.handleModTypeChange} />
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
  currentGraph: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(SimulatorInput);
