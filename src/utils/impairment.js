import * as lab from 'datacomm-lab';

export const doAWGN = (mod, pow) => {
  const awgn = lab.AWGN.generate(mod.length);
  return mod.slice().map((x, i) => x + awgn[i] * pow);
};
