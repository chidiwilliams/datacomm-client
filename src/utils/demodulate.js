import * as lab from 'datacomm-lab';

export const demodBPSK = (inp, rec) => {
  const carr = new lab.WaveSignal(lab.WaveSignalType.SINE, inp.length, 8);
  const bpsk = new lab.BPSK(inp, carr.signal);
  return bpsk.demodulate(rec);
};
