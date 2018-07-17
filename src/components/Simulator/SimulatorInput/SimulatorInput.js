import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MessageInput from './MessageInput/MessageInput';
import Encoder from './Encoder/Encoder';
import Modulator from './Modulator/Modulator';

const styles = (theme) => ({
  formSection: {
    marginBottom: theme.spacing.unit * 4,
  },
  subheader: {
    fontWeight: 'bold',
  },
});

class SimulatorInput extends Component {
  state = {
    freq: 2048,
    bits: '0000',
    enc: 'hamm',
    mod: 'bpsk',
  };

  changeMsg = (item, val) => {
    this.setState({ [item]: val });
  };

  changeMod = (val) => {
    this.setState({ mod: val });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.root} autoComplete="off">
          <div className={classes.formSection}>
            <Typography variant="subheading" className={classes.subheader}>
              {'Message Input'}
            </Typography>
            <MessageInput
              setFreq={(freq) => this.props.setFreq(freq)}
              setBits={(bits) => this.props.setBits(bits)}
              initFreq={this.state.freq}
              initBits={this.state.bits}
            />
          </div>
          <div className={classes.formSection}>
            <Typography variant="subheading" className={classes.subheader}>
              {'Encoder'}
            </Typography>
            <Encoder
              handleEncChange={(enc) => this.props.setEnc(enc)}
              initType={this.state.enc}
            />
          </div>
          <div className={classes.formSection}>
            <Typography variant="subheading" className={classes.subheader}>
              {'Modulator'}
            </Typography>
            <Modulator
              handleModChange={this.changeMod}
              initMod={this.state.mod}
            />
          </div>
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
};

export default withStyles(styles, { withTheme: true })(SimulatorInput);
