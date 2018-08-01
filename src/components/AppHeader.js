import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
  appHeader: {
    margin: [[theme.spacing.unit * 3, 0]],
  },
});

class AppHeader extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="display1" className={classes.appHeader}>
          {this.props.text}
        </Typography>
      </div>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppHeader);
