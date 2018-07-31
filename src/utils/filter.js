import { Filter, FilterType } from 'datacomm-lab';

export const lowPass = (dem, taps, cutoff) => {
  // TODO: Move repeated filtering to datacomm-lab
  const filt = new Filter(FilterType.LPF, taps, dem.length, cutoff);
  return Array.apply(null, Array(dem.length)).map((x, i) =>
    filt.do_sample(dem[i])
  );
};
