function calculateLimits(limit, tolerance) {
  const upperLimit = limit.max;
  const lowerLimit = limit.min;
  const upperWarningLimit = upperLimit - (upperLimit * tolerance);
  const lowerWarningLimit = lowerLimit + (upperLimit * tolerance);
  return {upperWarningLimit, lowerWarningLimit};
}

function checkValueInRange(value, limit, tolerance) {
  const {upperWarningLimit, lowerWarningLimit} = calculateLimits(limit, tolerance);

  const rangeClassifications = [
    {range: value < limit.min, result: 'LOW'},
    {range: value > limit.max, result: 'HIGH'},
    {
      range: value >= lowerWarningLimit && value <= upperWarningLimit,
      result: 'WARNING: Approaching limit',
    },
  ];

  const matchedClassification = rangeClassifications.find(({range}) => range);

  return matchedClassification ? matchedClassification.result : 'NORMAL';
}

module.exports = {checkValueInRange};
