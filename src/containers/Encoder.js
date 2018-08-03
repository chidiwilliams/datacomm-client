import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaults from '../config/defaults';
import LabGroup from '../components/LabGroup';
import ButtonCrement from './ButtonCrement';

class Encoder extends Component {
  static propTypes = {
    handleEncChange: PropTypes.func,
    onGrpLaunch: PropTypes.func,
  };

  state = {
    type: defaults.encType,
  };

  handleSelectChange = (val) => {
    this.setState({ type: val }, () => {
      this.props.handleEncChange(val);
    });
  };

  render() {
    return (
      <div>
        <LabGroup
          title="Encoder"
          onGrpLaunch={this.props.onGrpLaunch}
          inputs={[
            {
              label: 'Scheme',
              component: (
                <ButtonCrement
                  options={defaults.allEnc}
                  handleChange={(idx) =>
                    this.handleSelectChange(defaults.allEnc[idx])
                  }
                />
              ),
            },
          ]}
        />
      </div>
    );
  }
}

export default Encoder;
