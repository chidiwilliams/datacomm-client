import * as lab from 'datacomm-lab';

export default (arr) => {
  const sig = new lab.Signal(arr.length);
  sig.signal = arr;

  return {
    fx: Array.apply(null, Array(arr.length / 2 + 1)).map((x, i) => +i),
    fy: sig.getFrequencyResponse(),
  };
};
