export default (freq) => {
  return Array.apply(null, Array(freq)).map((x, i, a) =>
    parseFloat((i / a.length).toFixed(4))
  );
};
