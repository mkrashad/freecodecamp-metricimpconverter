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

  test('should correctly read a decimal number input', function () {
    const inputNumber = convertHandler.getNum('3.1km');
    assert.equal(inputNumber, 3.1);
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

  test('should correctly read each valid input unitn', function () {
    const inputNumber = convertHandler.getUnit('km');
    assert.equal(inputNumber, 'km');
  });

  test('should correctly return an error for an invalid input unit', function () {
    const inputNumber = convertHandler.getUnit('kl');
    assert.ifError(inputNumber);
  });

  // test('should return the correct return unit for each valid input unit', function () {
  //   const inputNumber = convertHandler.convert('3km');
  //   assert.equal(inputNumber, 'mi');
  // });
  // test('should correctly return an error on a double-fraction', function () {
  //   const inputNumber = convertHandler.getNum('3.1/4km')[0];
  //   assert.equal(inputNumber, 0.775);
  // });
  // test('should correctly return an error on a double-fraction', function () {
  //   const inputNumber = convertHandler.getNum('3.1/4km')[0];
  //   assert.equal(inputNumber, 0.775);
  // });
  // test('should correctly return an error on a double-fraction', function () {
  //   const inputNumber = convertHandler.getNum('3.1/4km')[0];
  //   assert.equal(inputNumber, 0.775);
  // });
  // test('should correctly return an error on a double-fraction', function () {
  //   const inputNumber = convertHandler.getNum('3.1/4km')[0];
  //   assert.equal(inputNumber, 0.775);
  // });
  // test('should correctly return an error on a double-fraction', function () {
  //   const inputNumber = convertHandler.getNum('3.1/4km')[0];
  //   assert.equal(inputNumber, 0.775);
  // });
  // test('should correctly return an error on a double-fraction', function () {
  //   const inputNumber = convertHandler.getNum('3.1/4km')[0];
  //   assert.equal(inputNumber, 0.775);
  // });
});
