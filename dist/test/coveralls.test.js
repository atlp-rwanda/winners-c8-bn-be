"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _sum = require("./sum");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('coveralls testing', done => {
  it('makes sum of two numbers', () => {
    (0, _assert.default)((0, _sum.sum)(2, 3) === 5);
  });
});