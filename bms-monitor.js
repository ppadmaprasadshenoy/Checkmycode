const {convertTemperatureUnit} = require('./conversion');
const {checkValueInRange} = require('./limits');

const MEASUREMENT_LIMITS = {
  temperature: {limit: {min: 0, max: 45}, tolerance: 0.05, unit: 'Celsius'},
  soc: {limit: {min: 20, max: 80}, tolerance: 0.05, unit: '%'},
  chargeRate: {limit: {min: 0, max: 0.8}, tolerance: 0.05, unit: 'per hour'},
};

function batteryIsOk(temperature, soc, chargeRate, temperatureUnit = 'Celsius') {
  const temperatureInCelsius = convertTemperatureUnit(temperature, temperatureUnit, 'Celsius');
  const temperatureStatus = checkValueInRange(
      temperatureInCelsius,
      MEASUREMENT_LIMITS.temperature.limit,
      MEASUREMENT_LIMITS.temperature.tolerance,
  );
  const socStatus = checkValueInRange(
      soc,
      MEASUREMENT_LIMITS.soc.limit,
      MEASUREMENT_LIMITS.soc.tolerance,
  );
  const chargeRateStatus = checkValueInRange(
      chargeRate,
      MEASUREMENT_LIMITS.chargeRate.limit,
      MEASUREMENT_LIMITS.chargeRate.tolerance,
  );

  return temperatureStatus === 'NORMAL' && socStatus === 'NORMAL' && chargeRateStatus === 'NORMAL';
}

module.exports = {batteryIsOk};
