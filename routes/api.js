'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const initNum = convertHandler.getNum(req.query.input);
    if (!initNum) {
      res.send('invalid number');
    }
    const initUnit = convertHandler.getUnit(req.query.input);
    const [convertNumUnit, fullInitUnit, fullReturnUnit] =
      convertHandler.convert(initNum, initUnit);

    if (!convertNumUnit) {
      res.send('invalid unit');
    }
    const returnNum = convertHandler.spellOutUnit(convertNumUnit);
    const returnUnit = convertHandler.getReturnUnit(convertNumUnit);
    const convertString = convertHandler.getString(
      initNum,
      fullInitUnit,
      returnNum,
      fullReturnUnit
    );

    res.status(200).json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: convertString,
    });
  });
};
