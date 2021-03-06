import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from './Graph';
import './LabGraphs.css';

export default class LabGraphs extends Component {
  static propTypes = {
    tGraph: PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.number).isRequired,
      y: PropTypes.arrayOf(PropTypes.number).isRequired,
      tit: PropTypes.string.isRequired,
    }),
    fGraph: PropTypes.shape({
      x: PropTypes.arrayOf(PropTypes.number).isRequired,
      y: PropTypes.arrayOf(PropTypes.number).isRequired,
      tit: PropTypes.string.isRequired,
      xmax: PropTypes.number,
    }),
  };

  getRandomChartId = () => 'chart-' + parseInt(Math.random() * 100000, 10);

  render() {
    const tGraph = this.props.tGraph || {};
    const fGraph = this.props.fGraph || {};

    return (
      <div className="graphs">
        <div className="graph">
          <div className="graphLabel">Time response</div>
          <div className="graphYLabel">V</div>
          <div className="graphXLabel">sec</div>
          <Graph
            id={this.getRandomChartId()}
            height="100%"
            xinput={tGraph.x}
            yinput={tGraph.y}
          />
        </div>
        <div className="graph">
          <div className="graphLabel">Frequency magnitude response</div>
          <div className="graphYLabel">Mag</div>
          <div className="graphXLabel">Hz</div>
          <Graph
            id={this.getRandomChartId()}
            height="100%"
            xinput={fGraph.x}
            yinput={fGraph.y}
            xmax={fGraph.xmax}
          />
        </div>
      </div>
    );
  }
}
