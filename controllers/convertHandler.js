function ConvertHandler() {
  this.getNum = function (input) {
    const pattern = /^(-?\d+(\.\d+)?(\/\d+(\.\d+)?)?)/;
    if (input) {
      const result = input.match(pattern);
      if (result) {
        return eval(result[0]);
      }
    }
    return null;
  };

  this.getUnit = function (input) {
    const pattern = /(gal|l|lbs|kg|mi|km)$/gi;
    if (input) {
      let result = input.match(pattern);
      if (result) {
        const unit = result[0];
        if (unit === 'l' || unit === 'L') {
          return unit.toUpperCase();
        }
        return unit.toLowerCase();
      }
    }
    return null;
  };

  this.getReturnUnit = function (initUnit) {
    return this.getUnit(initUnit);
  };

  this.spellOutUnit = function (input) {
    if (input) {
      return Number(this.getNum(input).toFixed(5));
    } else {
      return null;
    }
  };

  this.convert = function (initNum, initUnit) {
    //Full vars
    const fullGal = 'gallons';
    const fullL = 'Liters';
    const fullLbs = 'pounds';
    const fullKg = 'killograms';
    const fullMi = 'miles';
    const fullKm = 'kilometers';

    //Short vars

    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let fullInitUnit;
    let fullReturnUnit;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL + 'L';
        fullInitUnit = fullGal;
        fullReturnUnit = fullL;
        break;
      case 'L':
        result = initNum / galToL + 'gal';
        fullInitUnit = fullL;
        fullReturnUnit = fullGal;
        break;
      case 'lbs':
        result = initNum * lbsToKg + 'kg';
        fullInitUnit = fullLbs;
        fullReturnUnit = fullKg;
        break;
      case 'kg':
        result = initNum / lbsToKg + 'lbs';
        fullInitUnit = fullKg;
        fullReturnUnit = fullLbs;
        break;
      case 'mi':
        result = initNum * miToKm + 'km';
        fullInitUnit = fullMi;
        fullReturnUnit = fullKm;
        break;
      case 'km':
        result = initNum / miToKm + 'mi';
        fullInitUnit = fullKm;
        fullReturnUnit = fullMi;
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
