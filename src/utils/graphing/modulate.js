import * as lab from 'datacomm-lab';

export const doBPSK = (hammed) => {
  // Get message signal
  const hamm = new lab.Signal(hammed.length);
  hamm.signal = hammed;

  const carr = new lab.WaveSignal(lab.WaveSignalType.SINE, hammed.length, 8);
  const bpsk = new lab.BPSK(hamm.sample(hammed.length), carr.signal);
  return bpsk.modulated;
};
