import * as lab from 'datacomm-lab';

export default (bits, freq) => {
  // Hamming encoding
  // Get time response
  const bi = new lab.Signal(bits.length);
  bi.signal = bits.split('').map(parseFloat);

  const hammed = new lab.Signal(8);
  hammed.signal = new lab.Hamming4().encode(bi.signal, true);

  const hamm = new lab.Signal(freq);
  hamm.signal = hammed.sample(freq);
  const hammedx = Array.apply(null, Array(freq)).map((x, i) => i);

  // Get frequency response
  const hammedfr = hamm.getFrequencyResponse();
  const hammedfrx = Array.apply(null, Array(freq / 2 + 1)).map((x, i) => i);

  return {
    hammed: hammed.signal.join(''),
    tx: hammedx,
    ty: hamm.signal,
    fx: hammedfrx,
    fy: hammedfr,
  };
};
