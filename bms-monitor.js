function inRange(val, min, max) {
  if (val<min || val>max) {
    return false;
  } else {
    return true;
  }
}

function checkTemperatureRange(temperature) {
  return inRange(temperature, 0, 45);
}
function checkSocRange(soc) {
  return inRange(soc, 20, 80);
}
function checkChargeRateRange(chargeRate) {
  return inRange(chargeRate, 0, 0.8);
}

function check(parameters) {
  return parameters;
}

function batteryIsOk(temperature, soc, chargeRate) {
  const temperatureValue = checkTemperatureRange(temperature);
  const socValue = checkSocRange(soc);
  const chargeRateValue = checkChargeRateRange(chargeRate);
  const parameters = [temperatureValue, socValue, chargeRateValue];
  const isBatteryOk = parameters.every(check);
  return isBatteryOk;
}

module.exports = {batteryIsOk};
