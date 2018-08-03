import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LabGraphs from './LabGraphs';
import './defaults.css';
import './Test.css';
import LabInput from './LabInput';

const styles = () => ({});

class Lab extends Component {
  state = {
    graphs: {},
  };

  updateGraphs = (graphs) => {
    this.setState({ graphs: graphs });
  };

  render() {
    return (
      <div className="main">
        <div className="container">
          <div className="osc">
            <div className="uprising">
              <div className="left">
                <LabGraphs
                  tGraph={this.state.graphs.t}
                  fGraph={this.state.graphs.f}
                />
              </div>
              <div className="right">
                <div className="controls">
                  {
                    //                 <div className="labHeader">
                    //                   <div className="labTitle">DataComm Laboratory</div>
                    //                   <div className="labAppTitle">Spectrometer</div>
                    //                 </div>
                  }
                  <LabInput updateGraphs={this.updateGraphs} />
                </div>
              </div>
            </div>
          </div>
          <div className="oscShadow" />
        </div>
      </div>
    );
  }
}

Lab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Lab);
