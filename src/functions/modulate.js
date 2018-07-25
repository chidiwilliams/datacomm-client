import * as lab from 'datacomm-lab';
import getXAxis from './graphing/getXAxis';
import getFRes from './graphing/getFRes';

export const doBPSK = (hammed, freq) => {
  // Get message signal
  const hamm = new lab.Signal(8);
  hamm.signal = hammed.split('').map(parseFloat);

  const msg = new lab.Signal(freq);
  msg.signal = hamm.sample(freq);

  const carr = new lab.WaveSignal(lab.WaveSignalType.SINE, freq, 8);
  const bpsk = new lab.BPSK(msg.signal, carr.signal);

  // Get frequency response
  const bb = new lab.Signal(freq);
  bb.signal = bpsk.modulated;

  const fres = getFRes(bb.signal);

  return {
    tx: getXAxis(freq),
    ty: bpsk.modulated,
    fx: fres.fx,
    fy: fres.fy,
  };
};
