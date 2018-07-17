import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

class Graph extends Component {
  componentDidMount = () => {
    const ctx = document.getElementById(this.props.id).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Noise Sample',
            fill: false,
            borderColor: 'rgb(200, 0, 0)',
            borderWidth: 1,
            pointRadius: 0,
            data: this.props.yinput,
          },
        ],
        labels: this.props.xinput,
      },
      options: {
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
      },
    });
  };

  render() {
    return (
      <div>
        <canvas id={this.props.id} />
      </div>
    );
  }
}

Graph.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  xinput: PropTypes.array.isRequired,
  yinput: PropTypes.array.isRequired,
};

export default Graph;
