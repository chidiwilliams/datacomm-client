import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from '../components/Graph';
import './LabGraphs.css';

export default class LabGraphs extends Component {
  static propTypes = {
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

  render() {
    const tGraph = this.props.tGraph || {};
    const fGraph = this.props.fGraph || {};

    return (
      <div className="graphs">
        <div className="graph">
          <Graph id={0} height={'100%'} xinput={tGraph.x} yinput={tGraph.y} />
        </div>
        <div className="graph">
          <Graph
            id={1}
            height={'100%'}
            xinput={fGraph.x}
            yinput={fGraph.y}
            xmas={fGraph.xmas}
          />
        </div>
      </div>
    );
  }
}
