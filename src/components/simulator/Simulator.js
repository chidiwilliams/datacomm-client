import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MessageInput from './MessageInput/MessageInput';
import Encoder from './Encoder/Encoder';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  appHeader: {
    marginTop: theme.spacing.unit * 6,
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
});

class Simulator extends Component {
  state = {
    freq: 2048,
    bits: '0000',
    enc: 'hamm',
  };

  changeMsg = (item, val) => {
    this.setState({ [item]: val });
  };

  changeEnc = (val) => {
    this.setState({ enc: val });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={24} justify="center">
          <Grid container md={10} spacing={24}>
            <Grid item xs={12}>
              <Typography variant="display1" className={classes.appHeader}>
                {'Simulator'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container md={10} spacing={24}>
            <Grid item md={6} xs={12}>
              <Paper className={classes.paddedBox}>
                <form className={classes.root} autoComplete="off">
                  <div className={classes.formSection}>
                    <Typography
                      variant="subheading"
                      className={classes.subheader}
                    >
                      {'Message Input'}
                    </Typography>
                    <MessageInput
                      handleMsgChange={this.changeMsg}
                      initFreq={this.state.freq}
                      initBits={this.state.bits}
                    />
                  </div>
                  <div className={classes.formSection}>
                    <Typography
                      variant="subheading"
                      className={classes.subheader}
                    >
                      {'Encoder'}
                    </Typography>
                    <Encoder
                      handleEncChange={this.changeEnc}
                      initType={this.state.enc}
                    />
                  </div>
                </form>
              </Paper>
            </Grid>
            <Grid item md={6} xs={12}>
              <Paper className={classes.paddedBox}>
                <table>
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
                </table>
              </Paper>
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
