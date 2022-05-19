"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this folder will contain routes methods, with the needed middlewares being passed as parameters ( ... )
const router = _express.default.Router();

router.get("/users/", async (req, res) => {
  res.send({
    "message": "Nothing is set yet!"
  });
});
var _default = router;
exports.default = _default;