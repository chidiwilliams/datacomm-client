import { WaveSignalType, WaveSignal } from 'datacomm-lab';
import defaults from '../config/defaults';

export default (type, fs, fa) => {
  if (defaults.allWaveshapes.indexOf(type) < 0) {
    throw new Error('Invalid waveshape.');
  }

  return new WaveSignal(
    type === 'sine'
      ? WaveSignalType.SINE
      : type === 'square'
        ? WaveSignalType.SQUARE
        : WaveSignalType.TRIANGULAR,
    fs,
    fa
  ).signal;
};
