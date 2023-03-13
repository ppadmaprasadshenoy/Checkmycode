function convertTemperatureUnit(temperature, fromUnit, toUnit) {
  if (fromUnit === toUnit) return temperature;

  const conversions = {
    'Celsius-Fahrenheit': (temperature) => (temperature * 9 / 5) + 32,
    'Fahrenheit-Celsius': (temperature) => (temperature - 32) * 5 / 9,
  };

  const conversionKey = `${fromUnit}-${toUnit}`;
  const conversionFunction = conversions[conversionKey];

  if (!conversionFunction) {
    throw new Error(`Invalid temperature units: ${fromUnit}, ${toUnit}`);
  }

  return conversionFunction(temperature);
}

module.exports = {convertTemperatureUnit};
