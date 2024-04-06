'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const initNum = convertHandler.getNum(req.query.input);
    const initUnit = convertHandler.getUnit(req.query.input);

    if (!initNum && !initUnit) {
      res.json('invalid number and unit')
    }
    if (!initUnit) {
      res.json('invalid unit')
    }
    if (isNaN(initNum)) {
      res.json('invalid number')
    }
    const returnUnit = convertHandler.getReturnUnit(initNum, initUnit);

    const returnNum = convertHandler.spellOutUnit(initNum, initUnit);

    const [result, fullInitUnit, fullReturnUnit, shortReturnUnit] =
      convertHandler.convert(initNum, initUnit);

    const convertString = convertHandler.getString(
      initNum,
      fullInitUnit,
      returnNum,
      fullReturnUnit
    );
    res
      .json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: convertString,
      })
      .status(200);
  });
};
