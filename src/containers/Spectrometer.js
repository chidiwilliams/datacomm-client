import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppHeader from '../components/AppHeader';
import SimulatorInput from './SimulatorInput';

const styles = (theme) => ({});

class Spectrometer extends Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppHeader text={'Spectrometer'} />
        <SimulatorInput
          heading={'Input'}
          onLaunch={(evt) => console.log(evt)}
          component={<div>Hello</div>}
        />
      </div>
    );
  }
}

Spectrometer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Spectrometer);
