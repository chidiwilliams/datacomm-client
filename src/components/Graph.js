import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import './Graph.css';

class Graph extends Component {
  drawChart() {
    const ctx = document.getElementById(this.props.id).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            fill: false,
            borderColor: 'rgb(200, 0, 0)',
            borderWidth: 1,
            pointRadius: 0,
            data: this.props.yinput,
            label: this.props.ylabel || null,
          },
        ],
        labels: this.props.xinput,
      },
      options: {
        maintainAspectRatio: false,
        animation: 0,
        elements: {
          line: {
            tension: 0,
          },
        },
        title: {
          display: true,
          text: this.props.title,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                min: this.props.xmin || null,
                max: this.props.xmas || null,
              },
            },
          ],
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
      // This should be changed to updating the chart instead of redrawing,
      // but I can't get the chart to respond to updating of the chart state.
      // Redraw for now.
      this.drawChart();
    }
  }

  render() {
    return (
      <div
        className="canvasP"
        style={{
          height: this.props.height,
          width: this.props.width,
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
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  xinput: PropTypes.array.isRequired,
  yinput: PropTypes.array.isRequired,
  ylabel: PropTypes.string,
  xmas: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Graph;
