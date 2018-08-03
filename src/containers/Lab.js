import React, { Component } from 'react';
import LabGraphs from './LabGraphs';
import './defaults.css';
import './Lab.css';
import LabInput from './LabInput';
import defaults from '../config/defaults';

class Lab extends Component {
  state = {
    graphs: {},
    selectedApp: defaults.appIndex,
  };

  updateGraphs = (graphs) => {
    this.setState({ graphs: graphs });
  };

  render() {
    return (
      <div className="main">
        <div className="container">
          <div className="header">
            <div className="labApps">
              {defaults.apps.map((x, i) => (
                <a
                  className={
                    this.state.selectedApp === i ? 'labApp selected' : 'labApp'
                  }
                  href="#"
                  key={i}
                >
                  {x}
                </a>
              ))}
            </div>
          </div>
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
