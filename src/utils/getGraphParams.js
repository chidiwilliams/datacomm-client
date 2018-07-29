import getXAxis from './graphing/getXAxis';
import getFRes from './graphing/getFRes';

export default (arr, name) => {
  const fres = getFRes(arr);
  return {
    t: {
      x: getXAxis(arr.length),
      y: arr,
      tit: name + ' signal time response',
    },
    f: {
      x: fres.fx,
      y: fres.fy,
      tit: name + ' signal frequency response',
      xmas: 128,
    },
  };
};
