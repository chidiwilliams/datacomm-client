import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  display1: {
    marginTop: 50,
    marginBottom: 20,
  },
  paddedBox: {
    padding: 15,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250,
  },
});

class Simulator extends Component {
  state = {
    freq: '',
    checkedA: true,
    checkedB: true,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleText = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  handleChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        <Grid container spacing={24} justify="center">
          <Grid container md={10} spacing={24}>
            <Grid item xs={12}>
              <Typography variant="display1" className={classes.display1}>
                {'Simulator'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container md={10} spacing={24}>
            <Grid item md={6} xs={12}>
              <Paper className={classes.paddedBox}>
                <form className={classes.root} autoComplete="off">
                  <FormGroup>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="freq">
                        Sampling frequency
                      </InputLabel>
                      <Select
                        value={this.state.freq}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'freq',
                          id: 'freq',
                        }}
                      >
                        <MenuItem value={120}>128</MenuItem>
                        <MenuItem value={256}>256</MenuItem>
                        <MenuItem value={512}>512</MenuItem>
                        <MenuItem value={1024}>1024</MenuItem>
                        <MenuItem value={2048}>2048</MenuItem>
                      </Select>
                    </FormControl>
                  </FormGroup>

                  <FormGroup>
                    <TextField
                      id="input"
                      label="Input"
                      value={this.state.input}
                      onChange={this.handleText('age')}
                      type="number"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </FormGroup>
                </form>
              </Paper>
            </Grid>
            <Grid item md={6} xs={12}>
              <Paper className={classes.paddedBox}>{'Simulator'}</Paper>
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
