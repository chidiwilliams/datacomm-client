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
  state = {
    freq: 2048,
    bits: '0000',
    enc: 'hamm',
    mod: 'bpsk',
  };

  updateGraph = (sect) => {
    this.props.updateGraph(sect);
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
              onClick={() => this.updateGraph('message')}
            >
              <LaunchIcon />
            </IconButton>
            <MessageInput
              setFreq={(freq) => this.props.setFreq(freq)}
              setBits={(bits) => this.props.setBits(bits)}
              initFreq={this.state.freq}
              initBits={this.state.bits}
            />
          </Paper>
          <Paper className={classes.formSection}>
            <Typography variant="subheading" className={classes.subheader}>
              {'Encoder'}
            </Typography>
            <Encoder
              handleEncChange={(enc) => this.props.setEnc(enc)}
              initType={this.state.enc}
            />
          </Paper>
          <Paper className={classes.formSection}>
            <Typography variant="subheading" className={classes.subheader}>
              {'Modulator'}
            </Typography>
            <Modulator
              handleModChange={(mod) => this.props.setMod(mod)}
              initMod={this.state.mod}
            />
          </Paper>
        </form>
      </div>
    );
  }
}

SimulatorInput.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  setFreq: PropTypes.func,
  setBits: PropTypes.func,
  setEnc: PropTypes.func,
  setMod: PropTypes.func,
  updateGraph: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(SimulatorInput);
