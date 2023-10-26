function ConvertHandler() {
  this.getNum = function (input) {
    const pattern = /^[0-9]||^[0-9]\.[0-9]/gm;
    const result = input.match(pattern);
    return Number(result[0]);
  };

  this.getUnit = function (input) {
    const pattern = /[a-z]/gi;
    const result = input.match(pattern).join('').toLowerCase();
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    result = this.getUnit(initUnit);
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    result = this.getNum(unit);
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL + 'l';
        break;
      case 'l':
        result = initNum / galToL + 'gal';
        break;
      case 'lbs':
        result = initNum * lbsToKg + 'kg';
        break;
      case 'kg':
        result = initNum / lbsToKg + 'lbs';
        break;
      case 'mi':
        result = initNum * miToKm + 'km';
        break;
      case 'km':
        result = initNum / miToKm + 'mi';
        break;
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
}

module.exports = ConvertHandler;
