const {assert, expect} = require('chai');
const {batteryIsOk} = require('../bms-monitor');
const {convertTemperatureUnit} = require('../conversion');

describe('Battery Status', function() {
  it('All parameters are within the range', function() {
    assert.isFalse(batteryIsOk(25, 50, 0.5));
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
});

describe('convertTemperatureUnit', () => {
  it('returns the temperature as is when the fromUnit and toUnit are the same', () => {
    const result = convertTemperatureUnit(25, 'Celsius', 'Celsius');
    expect(result).to.equal(25);
  });

  it('converts Celsius to Fahrenheit correctly', () => {
    const result = convertTemperatureUnit(0, 'Celsius', 'Fahrenheit');
    expect(result).to.equal(32);

    const result2 = convertTemperatureUnit(-40, 'Celsius', 'Fahrenheit');
    expect(result2).to.equal(-40);

    const result3 = convertTemperatureUnit(100, 'Celsius', 'Fahrenheit');
    expect(result3).to.equal(212);
  });

  it('converts Fahrenheit to Celsius correctly', () => {
    const result = convertTemperatureUnit(32, 'Fahrenheit', 'Celsius');
    expect(result).to.equal(0);

    const result2 = convertTemperatureUnit(-40, 'Fahrenheit', 'Celsius');
    expect(result2).to.equal(-40);

    const result3 = convertTemperatureUnit(212, 'Fahrenheit', 'Celsius');
    expect(result3).to.equal(100);
  });

  it('throws an error for invalid temperature units', () => {
    expect(() => {
      convertTemperatureUnit(25, 'Celsius', 'InvalidUnit');
    }).to.throw('Invalid temperature units: Celsius, InvalidUnit');

    expect(() => {
      convertTemperatureUnit(25, 'InvalidUnit', 'Fahrenheit');
    }).to.throw('Invalid temperature units: InvalidUnit, Fahrenheit');
  });
});

