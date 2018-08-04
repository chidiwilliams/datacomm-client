import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import './Graph.css';

class Graph extends Component {
  canvas = null;
  ctx = null;
  chartInstance = null;

  drawChart() {
    this.canvas = document.getElementById(this.props.id);
    this.ctx = this.canvas.getContext('2d');
    this.chartInstance = new Chart(this.ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgba(255, 0, 0, 0.15)',
            borderWidth: 1,
            pointRadius: 0,
            data: this.props.yinput,
          },
        ],
        labels: this.props.xinput,
      },
      options: {
        maintainAspectRatio: false,
        elements: { line: { tension: 0 } },
        title: {},
        legend: { display: false },
        scales: {
          xAxes: [
            {
              ticks: { max: this.props.xmas },
              gridLines: { color: 'rgba(255, 200, 200, 0.1)' },
            },
          ],
          yAxes: [{ gridLines: { color: 'rgba(255, 200, 200, 0.2)' } }],
        },
      },
    });
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.xinput) !== JSON.stringify(prevProps.xinput) ||
      JSON.stringify(this.props.yinput) !== JSON.stringify(prevProps.yinput) ||
      JSON.stringify(this.props.title) !== JSON.stringify(prevProps.title)
    ) {
      this.chartInstance.data.labels = this.props.xinput;
      this.chartInstance.data.datasets[0].data = this.props.yinput;
      this.chartInstance.options.scales.xAxes[0].ticks.max = this.props.xmax;
      this.chartInstance.update();
    }
  }

  render() {
    return (
      <div
        className="canvasP"
        style={{
          height: this.props.height,
          position: 'relative',
          margin: 'auto',
        }}
      >
        <canvas id={this.props.id} />
      </div>
    );
  }
}

Graph.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
  xinput: PropTypes.array,
  yinput: PropTypes.array,
  ylabel: PropTypes.string,
  xmax: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Graph;
