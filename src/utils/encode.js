import * as lab from 'datacomm-lab';
import getFRes from './graphing/getFRes';
import getXAxis from './graphing/getXAxis';

export const doHamming = (bits, freq) => {
  // Hamming encoding
  // Get time response
  const bi = new lab.Signal(bits.length);
  bi.signal = bits.split('').map(parseFloat);

  const hammed = new lab.Signal(8);
  hammed.signal = new lab.Hamming4().encode(bi.signal, true);

  const hamm = new lab.Signal(freq);
  hamm.signal = hammed.sample(freq);

  const fres = getFRes(hamm.signal);

  return {
    hammed: hammed.signal.join(''),
    tx: getXAxis(freq),
    ty: hamm.signal,
    fx: fres.fx,
    fy: fres.fy,
  };
};
