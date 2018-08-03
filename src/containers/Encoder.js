import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaults from '../config/defaults';
import LabGroup from '../components/LabGroup';

class Encoder extends Component {
  state = {
    type: defaults.encType,
  };

  handleSelectChange = (evt) => {
    const val = evt.target.value;
    this.setState({ type: val }, () => {
      this.props.handleEncChange(val);
    });
  };

  render() {
    return (
      <div>
        <LabGroup title="Encoder" />
        {
          // <div className="specGrp">
          //   <div className="specGrpLabel">Message input</div>
          //   <button className="specGrpTrigger">>></button>
          //   <FormControl className="">
          //     <InputLabel htmlFor="enc">Scheme</InputLabel>
          //     <Select
          //       value={this.state.type}
          //       onChange={this.handleSelectChange}
          //       inputProps={{
          //         name: 'enc',
          //         id: 'enc',
          //       }}
          //     >
          //       <MenuItem value={'hamm'}>Hamming (7,4)</MenuItem>
          //     </Select>
          //   </FormControl>
          // </div>
        }
      </div>
    );
  }
}

Encoder.propTypes = {
  handleEncChange: PropTypes.func,
};

export default Encoder;
