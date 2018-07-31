import { Signal, Hamming4 } from 'datacomm-lab';
import defaults from '../config/defaults';

export const decHamming = (rec) => {
  const r = new Signal(rec.length);
  r.signal = rec;

  const dec = new Signal(defaults.bits.length);
  dec.signal = new Hamming4().decode(r.sample(defaults.encLength).slice(0, 7));

  return dec.sample(rec.length);
};
