function ConvertHandler() {
  this.getNum = function (input) {
    try {
      let inputNumber = input.split(/[a-zA-Z]/)[0];
      if (inputNumber.includes('/')) {
        inputNumber = this.formatNumber(inputNumber);
      }
      
      const letters = input.split(/\d\s*/);
      const inputUnit = letters[letters.length - 1];
      return [inputNumber, inputUnit];
    } catch (error) {
      return null;
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
    const units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    const lowerInput = input.toLowerCase();
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
      return null;
    }
  };

  this.getReturnUnit = function (input) {
    return this.getUnit(this.getNum(input)[1]);
  };

  this.spellOutUnit = function (input) {
    return Number(parseFloat(this.getNum(input)[0]).toFixed(5));
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

    // const unitNames2 = {
    //   gal: { initUnitName: 'gallons', conversion: 3.78541 },
    //   L: { initUnitName: 'Liters' },
    //   lbs: { initUnitName: 'pounds', conversion: 0.453592 },
    //   kg: { initUnitName: 'kilograms' },
    //   mi: { initUnitName: 'miles', conversion: 1.60934 },
    //   km: { initUnitName: 'kilometers' },
    // };

    // Conversion
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let fullInitUnit;
    let fullReturnUnit;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL + 'L';
        fullInitUnit = unitNames.gal;
        fullReturnUnit = unitNames.L;
        break;
      case 'L':
        result = initNum / galToL + 'gal';
        fullInitUnit = unitNames.L;
        fullReturnUnit = unitNames.gal;
        break;
      case 'lbs':
        result = initNum * lbsToKg + 'kg';
        fullInitUnit = unitNames.lbs;
        fullReturnUnit = unitNames.kg;
        break;
      case 'kg':
        result = initNum / lbsToKg + 'lbs';
        fullInitUnit = unitNames.kg;
        fullReturnUnit = unitNames.lbs;
        break;
      case 'mi':
        result = initNum * miToKm + 'km';
        fullInitUnit = unitNames.mi;
        fullReturnUnit = unitNames.km;
        break;
      case 'km':
        result = initNum / miToKm + 'mi';
        fullInitUnit = unitNames.km;
        fullReturnUnit = unitNames.mi;
        break;
      default:
        result = null;
        break;
    }
    return [result, fullInitUnit, fullReturnUnit];
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
}

module.exports = ConvertHandler;
