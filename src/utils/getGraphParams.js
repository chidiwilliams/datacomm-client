import * as lab from 'datacomm-lab';

export default (arr, name) => {
  // Get array's x-axis
  const arrx = Array.apply(null, Array(arr.length)).map((x, i, a) =>
    parseFloat((i / a.length).toFixed(4))
  );

  // Get frequency response
  const fx = Array.apply(null, Array(arr.length / 2 + 1)).map((x, i) => +i);
  const sig = new lab.Signal(arr.length);
  sig.signal = arr;
  const fy = sig.getFrequencyResponse();

  return {
    t: {
      x: arrx,
      y: arr,
      tit: name + ' signal time response',
    },
    f: {
      x: fx,
      y: fy,
      tit: name + ' signal frequency response',
      xmas: 128,
    },
  };
};
