import React, { Component } from 'react';
import LabGraphs from './LabGraphs';
import './defaults.css';
import './Lab.css';
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
                  <LabInput updateGraphs={this.updateGraphs} />
                </div>
                <div className="labHeader">DataComm Laboratory</div>
                <div className="labAppTitle">Spectrometer</div>
              </div>
            </div>
          </div>
          <div className="oscShadow" />
        </div>
      </div>
    );
  }
}

export default Lab;
