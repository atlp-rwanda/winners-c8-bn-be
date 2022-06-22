const uuid = require("uuid");
const uuidv4 = uuid.v4;

const listOfUuid = [uuidv4(), uuidv4(), uuidv4()];

module.exports = listOfUuid;
