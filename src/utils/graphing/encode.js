import * as lab from 'datacomm-lab';
import getFRes from './getFRes';
import getXAxis from './getXAxis';

export const doHamming = (bits, freq) => {
  // Hamming encoding
  // Get time response
  const bi = new lab.Signal(bits.length);
  bi.signal = bits;

  const hammed = new lab.Signal(8);
  hammed.signal = new lab.Hamming4().encode(bi.signal, true);

  const hamm = new lab.Signal(freq);
  hamm.signal = hammed.sample(freq);

  const fres = getFRes(hamm.signal);

  return {
    hammed: hammed.signal,
    tx: getXAxis(freq),
    ty: hamm.signal,
    fx: fres.fx,
    fy: fres.fy,
  };
};
