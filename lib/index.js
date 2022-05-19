"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Now, the "process.env" object's properties will include those from the .env file
const port = process.env.PORT || 5000;
const app = (0, _express.default)();
app.use(_express.default.json());
app.use("/api", _index.default);
app.get("/", async (req, res) => {
  res.send({
    "message": "Hello World!"
  });
});
app.listen(port, () => {
  console.log("Server has started!");
});