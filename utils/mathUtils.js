const getPercentOf = (sub, sum) => {
  if (sub == null || (sum == null || sum === 0)) return 0;
  return (sub / sum).toFixed(2);
};

module.exports = {
  getPercentOf,
};
