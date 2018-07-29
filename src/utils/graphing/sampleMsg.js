import * as lab from 'datacomm-lab';
import returner from '../returner';

export default (bits, freq) => {
  // Compute time response
  // Get input bits
  const bi = new lab.Signal(4);
  bi.signal = bits;
  return returner(bi.sample(freq));
};
