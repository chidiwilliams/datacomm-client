import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Graph from '../components/Graph';
import './Test.css';

const styles = (theme) => ({});

class Spectrometer extends Component {
  state = {};

  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        <div className="osc">
          <div className="graphs">
            <div style={{ height: '50%' }}>
              <Graph id={0} height={'100%'} />
            </div>
            <div style={{ height: '50%' }}>
              <Graph id={1} height={'100%'} />
            </div>
          </div>
          <div className="controls" />
        </div>
        <div className="oscShadow" />
      </div>
    );
  }
}

Spectrometer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Spectrometer);
