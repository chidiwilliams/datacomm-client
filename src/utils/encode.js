import * as lab from 'datacomm-lab';

export const encHamming = (bits, freq) => {
  // Hamming encoding
  // Get time response
  const bi = new lab.Signal(bits.length);
  bi.signal = bits;

  const hammed = new lab.Signal(8);
  hammed.signal = new lab.Hamming4().encode(bi.signal, true);
  return hammed.sample(freq);
};
