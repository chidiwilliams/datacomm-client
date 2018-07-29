import getXAxis from './graphing/getXAxis';
import getFRes from './graphing/getFRes';

export default (arr) => {
  const fres = getFRes(arr);

  return {
    tx: getXAxis(arr.length),
    ty: arr,
    fx: fres.fx,
    fy: fres.fy,
  };
};
