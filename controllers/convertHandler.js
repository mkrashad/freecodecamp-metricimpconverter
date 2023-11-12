function ConvertHandler() {
  this.getNum = function (input) {
    const pattern = /([0-9]+([.][0-9]*)?|[.][0-9]+)/g;
    const result = input.match(pattern);
    return Number(result[0]);
  };

  this.getUnit = function (input) {
    const pattern = /[gal|l|lbs|kg|mi|km]/gi;
    const result = input.match(pattern).join('');
    if (result === 'l' || result === 'L') {
      return result.toUpperCase();
    }
    return result.toLowerCase();
  };

  this.getReturnUnit = function (initUnit) {
    return this.getUnit(initUnit);
  };

  this.spellOutUnit = function (input) {
    return Number(this.getNum(input).toFixed(5));
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
