import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Simulator from './Simulator';
import Spectrometer from './Spectrometer';
import Header from './Header';
import './Lab.css';

const styles = (theme) => ({
  main: {
    paddingTop: 100,
    backgroundColor: theme.palette.background.default,
  },
});

class Lab extends React.Component {
  state = {
    selectedApp: 1,
  };

  apps = {
    0: <Simulator />,
    1: <Spectrometer />,
    2: 'Convolutional encoder',
  };

  switchApp = (id) => this.setState({ selectedApp: id });

  render() {
    const { classes } = this.props;
    const getSelectedApp = this.apps[this.state.selectedApp];

    return (
      <div>
        <Header switchApp={this.switchApp} />
        <main className={classes.main}>
          <div className="container">{getSelectedApp}</div>
        </main>
      </div>
    );
  }
}

Lab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Lab);
