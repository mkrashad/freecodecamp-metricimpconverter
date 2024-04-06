function ConvertHandler() {
  this.getNum = function (input) {
    try {
      let inputNumber = input.split(/[a-zA-Z]/)[0];
      if (inputNumber.includes('/')) {
        inputNumber = this.formatNumber(inputNumber);
      }
      if (inputNumber == '') {
        inputNumber = 1;
      }
      return inputNumber;
    } catch (error) {
      throw Error;
    }
  };

  this.formatNumber = function (input) {
    const fractionString = input;
    const parts = fractionString.split('/');
    if (parts.length === 2) {
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);

      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        const result = numerator / denominator;
        return result;
      }
    }
  };

  this.getUnit = function (input) {
    const letters = input.split(/\d\s*/);
    const inputUnit = letters[letters.length - 1];
    const units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    const lowerInput = inputUnit.toLowerCase();
    try {
      for (let unit of units) {
        if (lowerInput === unit) {
          if (unit === 'l') {
            return unit.toUpperCase();
          }
          return unit.toLowerCase();
        }
      }
    } catch (error) {
      throw Error;
    }
  };

  this.getReturnUnit = function (value, unit) {
    const returnUnit = this.convert(value, unit);
    return returnUnit[3];
  };

  this.spellOutUnit = function (value, unit) {
    const returnNum = this.convert(value, unit)[0];
    return Number(parseFloat(returnNum).toFixed(5));
  };

  this.convert = function (initNum, initUnit) {
    const unitNames = {
      gal: 'gallons',
      L: 'Liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers',
    };

    // Conversion
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    let fullInitUnit;
    let fullReturnUnit;
    let shortReturnUnit;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        fullInitUnit = unitNames.gal;
        fullReturnUnit = unitNames.L;
        shortReturnUnit = 'L';
        break;
      case 'L':
        result = initNum / galToL;
        fullInitUnit = unitNames.L;
        fullReturnUnit = unitNames.gal;
        shortReturnUnit = 'gal';
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        fullInitUnit = unitNames.lbs;
        fullReturnUnit = unitNames.kg;
        shortReturnUnit = 'kg';
        break;
      case 'kg':
        result = initNum / lbsToKg;
        fullInitUnit = unitNames.kg;
        fullReturnUnit = unitNames.lbs;
        shortReturnUnit = 'lbs';
        break;
      case 'mi':
        result = initNum * miToKm;
        fullInitUnit = unitNames.mi;
        fullReturnUnit = unitNames.km;
        shortReturnUnit = 'km';
        break;
      case 'km':
        result = initNum / miToKm;
        fullInitUnit = unitNames.km;
        fullReturnUnit = unitNames.mi;
        shortReturnUnit = 'mi';
        break;
      default:
        result = null;
        break;
    }
    return [result, fullInitUnit, fullReturnUnit, shortReturnUnit];
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
}

module.exports = ConvertHandler;
