'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const [initNum, unit] = convertHandler.getNum(req.query.input);
    const initUnit = convertHandler.getUnit(unit);
    if (initNum == '') {
      initNum = 1;
    }
    if (!initNum && !initUnit) {
      res.json('invalid number and unit').status(403);
    }
    if (!initUnit) {
      res.json('invalid unit').status(403);
    }
    if (isNaN(initNum)) {
      res.json('invalid number').status(403);
    }

    const [convertNumUnit, fullInitUnit, fullReturnUnit] =
      convertHandler.convert(initNum, initUnit);

    const returnNum = convertHandler.spellOutUnit(convertNumUnit);
    const returnUnit = convertHandler.getReturnUnit(convertNumUnit);
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
