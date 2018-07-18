import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Graph from './Graph/Graph';

const styles = (theme) => ({
  formSection: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

class SimulatorGraphs extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.formSection}>
          <Graph
            title={this.props.tGraph.tit}
            xinput={this.props.tGraph.x}
            yinput={this.props.tGraph.y}
            id={1}
          />
        </Paper>
        <Paper className={classes.formSection}>
          <Graph
            title={this.props.fGraph.tit}
            xinput={this.props.fGraph.x}
            yinput={this.props.fGraph.y}
            xmas={this.props.fGraph.xmas}
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
