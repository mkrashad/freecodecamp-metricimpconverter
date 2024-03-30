function ConvertHandler() {
  this.getNum = function (input) {
    const pattern = /^(-?\d+(\.\d+)?(\/\d+(\.\d+)?)?)?/;
    try {
      const result = input.match(pattern);
      if (result) {
        return result[0] ? eval(result[0]) : 1;
      }
    } catch (error) {
      return 'invalid number';
    }
  };

  this.getUnit = function (input) {
    const pattern = /(gal|l|lbs|kg|mi|km)$/gi;
    try {
      const unit = input.match(pattern);
      if (unit[0] === 'l' || unit[0] === 'L') {
        return unit[0].toUpperCase();
      }
      return unit[0].toLowerCase();
    } catch (error) {
      return 'invalid unit';
    }
  };

  this.getReturnUnit = function (initUnit) {
    return this.getUnit(initUnit);
  };

  this.spellOutUnit = function (input) {
    if (input) {
      return parseFloat(Number(this.getNum(input)).toFixed(5));
    } else {
      return null;
    }
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
