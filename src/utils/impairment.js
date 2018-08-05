import * as lab from 'datacomm-lab';

// export const doAWGN = (mod, pow) => {
//   const awgn = lab.AWGN.generate(mod.length);
//   return mod.slice().map((x, i) => x + awgn[i] * pow);
// };

export const getAWGN = (max) => {
  return lab.AWGN.generate(max);
};

export const addAWGN = (sig, imp, pow) => {
  return sig.slice().map((x, i) => x + imp[i] * pow);
};
