import React, { Component } from 'react';
import LabGraphs from '../components/LabGraphs';
import defaults from '../config/defaults';
import './Lab.css';
import SimulatorInput from './SimulatorInput';
import SpectrometerInput from './SpectrometerInput';

class Lab extends Component {
  state = {
    graphs: {},
    selectedApp: defaults.appIndex,
  };

  updateGraphs = (graphs) => {
    this.setState({ graphs: graphs });
  };

  apps = {
    0: <SimulatorInput updateGraphs={this.updateGraphs} />,
    1: <SpectrometerInput updateGraphs={this.updateGraphs} />,
  };

  render() {
    const graphs = this.state.graphs || defaults.graph;

    return (
      <div className="main">
        <div className="container">
          <div className="header">
            <div className="labName">DataComm Laboratory</div>
            <div className="labApps">
              {defaults.apps.map((x, i) => (
                <button
                  className={
                    this.state.selectedApp === i ? 'labApp selected' : 'labApp'
                  }
                  key={i}
                  id={'lab-app-' + i}
                  onClick={(evt) => {
                    evt.preventDefault();
                    this.setState({
                      selectedApp: parseInt(
                        evt.currentTarget.id.split('lab-app-')[1],
                        10,
                      ),
                    });
                  }}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="osc">
            <div className="uprising">
              <div className="left">
                <LabGraphs tGraph={graphs.t} fGraph={graphs.f} />
              </div>
              <div className="right">
                <div className="controls">
                  {this.apps[this.state.selectedApp]}
                </div>
                <div className="labFooter">
                  <span style={{ marginRight: 3 }}>By Chidi Williams | </span>
                  <span>
                    <a href="https://www.github.com/chidiwilliams/datacomm-client">
                      Source
                    </a>
                  </span>
                </div>
                <div className="labAppTitle">
                  {defaults.apps[this.state.selectedApp]}
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

export default Lab;
