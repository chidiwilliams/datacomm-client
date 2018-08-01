import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Graph from './Graph';

const styles = (theme) => ({
  formSection: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

class SimulatorGraphs extends Component {
  render() {
    const { classes } = this.props;
    const tGraph = this.props.tGraph || { tit: 'Empty graph' };
    const fGraph = this.props.fGraph || { tit: 'Empty graph' };

    return (
      <div>
        <Paper className={classes.formSection}>
          <Graph
            title={tGraph.tit}
            xinput={tGraph.x}
            yinput={tGraph.y}
            ylabel={'Amplitude (V)'}
            id={1}
          />
        </Paper>

        <Paper className={classes.formSection}>
          <Graph
            title={fGraph.tit}
            xinput={fGraph.x}
            yinput={fGraph.y}
            xmas={fGraph.xmas}
            ylabel={'Magnitude'}
            id={2}
          />
        </Paper>
      </div>
    );
  }
}

SimulatorGraphs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  tGraph: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number).isRequired,
    y: PropTypes.arrayOf(PropTypes.number).isRequired,
    tit: PropTypes.string.isRequired,
  }).isRequired,
  fGraph: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number).isRequired,
    y: PropTypes.arrayOf(PropTypes.number).isRequired,
    tit: PropTypes.string.isRequired,
    xmas: PropTypes.number,
  }).isRequired,
};

export default withStyles(styles, { withTheme: true })(SimulatorGraphs);
