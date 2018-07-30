import { Signal } from 'datacomm-lab';
import defaults from '../config/defaults';

export default (inp) => {
  // TODO: X this makeshift way of calculating the threshold
  // points in binary at the same freq as the signal.
  // Move to datacomm-lab
  const sig = new Signal(inp.length);
  sig.signal = inp;

  const samp = new Signal(defaults.encLength);
  samp.signal = sig.sample(defaults.encLength);

  return samp.sample(inp.length).map((x, i) => (x > 0 ? 1 : 0));
};
