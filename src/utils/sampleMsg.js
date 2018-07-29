import * as lab from 'datacomm-lab';

export default (bits, freq) => {
  const bi = new lab.Signal(4);
  bi.signal = bits;
  return bi.sample(freq);
};
