const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('should correctly read a whole number input', function () {
    const inputNumber = convertHandler.getNum('4km');
    assert.equal(inputNumber, 4);
  });

  test('should correctly read a decimal number input', function () {
    const inputNumber = convertHandler.getNum('3.1km');
    assert.equal(inputNumber, 3.1);
  });

  test('should correctly read a fractional input', function () {
    const inputNumber = convertHandler.getNum('3/4km');
    assert.equal(inputNumber, 0.75);
  });

  test('should correctly read a fractional input with a decimal', function () {
    const inputNumber = convertHandler.getNum('3.1/4km');
    assert.equal(inputNumber, 0.775);
  });

  test('should correctly return an error on a double-fraction', function () {
    const inputNumber = convertHandler.getNum('3/2/3');
    assert.ifError(inputNumber);
  });

  test('should correctly default to a numerical input of 1', function () {
    const inputNumber = convertHandler.getNum('mi');
    assert.equal(inputNumber, 1);
  });

  test('should correctly read each valid input unit', function () {
    const inputNumber = convertHandler.getUnit('km');
    assert.equal(inputNumber, 'km');
  });

  test('should correctly return an error for an invalid input unit', function () {
    const inputNumber = convertHandler.getUnit('kl');
    assert.ifError(inputNumber);
  });

  test('should return the correct return unit for each valid input unit', function () {
    const inputNumber = convertHandler.getReturnUnit('3.1', 'km');
    assert.equal(inputNumber, 'mi');
  });

  test('should correctly return the spelled-out string unit for each valid input unit', function () {
    const inputNumber = convertHandler.spellOutUnit('3.1', 'kg');
    assert.equal(inputNumber, 6.83434);
  });

  test('should correctly convert gal to L', function () {
    const inputNumber = convertHandler.getReturnUnit('3', 'gal');
    assert.equal(inputNumber, 'L');
  });

  test('should correctly convert L to gal', function () {
    const inputNumber = convertHandler.getReturnUnit('3', 'L');
    assert.equal(inputNumber, 'gal');
  });

  test('should correctly convert mi to km', function () {
    const inputNumber = convertHandler.getReturnUnit('3', 'mi');
    assert.equal(inputNumber, 'km');
  });

  test('should correctly convert km to mi', function () {
    const inputNumber = convertHandler.getReturnUnit('3', 'km');
    assert.equal(inputNumber, 'mi');
  });

  test('should correctly convert lbs to kg', function () {
    const inputNumber = convertHandler.getReturnUnit('3', 'lbs');
    assert.equal(inputNumber, 'kg');
  });

  test('should correctly convert lbs to kg', function () {
    const inputNumber = convertHandler.getReturnUnit('3', 'kg');
    assert.equal(inputNumber, 'lbs');
  });
});
