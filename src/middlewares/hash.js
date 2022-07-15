/* eslint-disable require-jsdoc */
require("dotenv/config");
const { compareSync, hashSync, genSaltSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

class Protection {
  static async signToken(data) {
    const token = sign(data, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });
    return token;
  }
    static async verifyToken(token) {
    const data = verify(token, process.env.TOKEN_SECRET);
    return data;
  }

  // eslint-disable-next-line require-jsdoc
  static hashPassword(password) {
    return hashSync(password, genSaltSync(10));
  }


	// eslint-disable-next-line require-jsdoc
	static checkPassword(password, hashed) {
		return compareSync(password, hashed);
	
  }
}

module.exports = Protection;
