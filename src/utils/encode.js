import * as lab from 'datacomm-lab';

export const doHamming = (bits, freq) => {
  const hammed = new lab.Signal(8);
  hammed.signal = new lab.Hamming4().encode(bits, true);
  return hammed.sample(freq);
};
