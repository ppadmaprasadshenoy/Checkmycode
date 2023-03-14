const {assert, expect} = require('chai');
const {batteryIsOk} = require('../bms-monitor');
const {convertTemperatureUnit} = require('../conversion');
const {checkValueInRange} = require('../limits');

describe('Value Range Check', function() {
  it('Value is lower than lower warning limit', function() {
    assert.equal(checkValueInRange(10, {min: 20, max: 80}, 0.2), 'LOW');
  });

  it('Value is higher than upper warning limit', function() {
    assert.equal(checkValueInRange(90, {min: 20, max: 80}, 0.2), 'HIGH');
  });

  it('Value is within warning range range', function() {
    assert.equal(checkValueInRange(50, {min: 20, max: 80}, 0.2), 'WARNING: Approaching limit');
  });

  it('Value is within warning range', function() {
    assert.equal(checkValueInRange(75, {min: 20, max: 80}, 0.2), 'WARNING: Approaching limit');
  });

  it('Value is at lower warning limit', function() {
    assert.equal(checkValueInRange(20, {min: 20, max: 80}, 0.2), 'WARNING: Approaching limit');
  });

  it('Value is at upper warning limit', function() {
    assert.equal(checkValueInRange(80, {min: 20, max: 80}, 0.2), 'WARNING: Approaching limit');
  });
});

describe('Battery Status', function() {
  it('All parameters are within the range', function() {
    assert.isTrue(batteryIsOk(25, 50, 0.5, 'Celsius'));
  });

  it('Temperature is high', function() {
    assert.isFalse(batteryIsOk(50, 50, 0.5));
  });

  it('Temperature is low', function() {
    assert.isFalse(batteryIsOk(-10, 50, 0.5));
  });

  it('State of Charge is low', function() {
    assert.isFalse(batteryIsOk(25, 10, 0.5));
  });

  it('State of Charge is high', function() {
    assert.isFalse(batteryIsOk(25, 90, 0.5));
  });

  it('Charge rate is too low', function() {
    assert.isFalse(batteryIsOk(25, 50, -0.1));
  });

  it('Charge rate is too high', function() {
    assert.isFalse(batteryIsOk(25, 50, 0.9));
  });

  it('All parameters at minimum value', function() {
    assert.isTrue(batteryIsOk(0, 20, 0));
  });

  it('All parameters at maximum value', function() {
    assert.isTrue(batteryIsOk(45, 80, 0.8));
  });
  it('Temperature is at upper limit', function() {
    assert.isTrue(batteryIsOk(45, 50, 0.5));
  });

  it('Temperature is at lower limit', function() {
    assert.isTrue(batteryIsOk(0, 50, 0.5));
  });

  it('State of Charge is at upper limit', function() {
    assert.isTrue(batteryIsOk(25, 80, 0.5));
  });

  it('State of Charge is at lower limit', function() {
    assert.isTrue(batteryIsOk(25, 20, 0.5));
  });

  it('Charge rate is at upper limit', function() {
    assert.isTrue(batteryIsOk(25, 50, 0.8));
  });

  it('Charge rate is at lower limit', function() {
    assert.isTrue(batteryIsOk(25, 50, 0));
  });

  it('Temperature is in Fahrenheit', function() {
    assert.isTrue(batteryIsOk(100, 50, 0.5, 'Fahrenheit'));
  });

  it('Temperature is very high', function() {
    assert.isFalse(batteryIsOk(80, 50, 0.5));
  });

  it('Temperature is very low', function() {
    assert.isFalse(batteryIsOk(-50, 50, 0.5));
  });

  it('State of Charge is very low', function() {
    assert.isFalse(batteryIsOk(25, 5, 0.5));
  });

  it('State of Charge is very high', function() {
    assert.isFalse(batteryIsOk(25, 95, 0.5));
  });

  it('Charge rate is zero', function() {
    assert.isTrue(batteryIsOk(25, 50, 0));
  });

  it('Charge rate is maximum', function() {
    assert.isFalse(batteryIsOk(25, 50, 1));
  });

  it('All parameters are at borderline values', function() {
    assert.isTrue(batteryIsOk(32, 80, 0.6));
  });
});

describe('convertTemperatureUnit', () => {
  it('returns the temperature as is when the fromUnit and toUnit are the same', () => {
    const result = convertTemperatureUnit(25, 'Celsius', 'Celsius');
    expect(result).to.equal(25);
  });

  it('converts Celsius to Fahrenheit correctly', function() {
    const result = convertTemperatureUnit(0, 'Celsius', 'Fahrenheit');
    assert.approximately(result, 32, 0.1);

    const result2 = convertTemperatureUnit(-40, 'Celsius', 'Fahrenheit');
    assert.approximately(result2, -40, 0.1);

    const result3 = convertTemperatureUnit(100, 'Celsius', 'Fahrenheit');
    assert.approximately(result3, 212, 0.1);
  });

  it('converts Fahrenheit to Celsius correctly', function() {
    const result = convertTemperatureUnit(32, 'Fahrenheit', 'Celsius');
    assert.approximately(result, 0, 0.1);

    const result2 = convertTemperatureUnit(-40, 'Fahrenheit', 'Celsius');
    assert.approximately(result2, -40, 0.1);

    const result3 = convertTemperatureUnit(212, 'Fahrenheit', 'Celsius');
    assert.approximately(result3, 100, 0.1);
  });

  it('throws an error for invalid temperature units', function() {
    assert.throw(function() {
      convertTemperatureUnit(25, 'Celsius', 'InvalidUnit');
    }, 'Invalid temperature units: Celsius, InvalidUnit');

    assert.throw(function() {
      convertTemperatureUnit(25, 'InvalidUnit', 'Fahrenheit');
    }, 'Invalid temperature units: InvalidUnit, Fahrenheit');
  });
});

