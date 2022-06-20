import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";
import app from "../../src/index";
import { signup } from "./mocks/Users";
import { User } from "../database/models";
import Protection from "../middlewares/hash";

dotenv.config();
chai.use(chaiHttp);

describe("Auth check middlewares", () => {
  let token;
  before(async () => {
    await User.destroy({ where: {} });
    await User.create({
      ...signup,
      password: Protection.hashPassword(signup.password),
      verified: true,
    });
    const res = await chai
      .request(app)
      .post("/api/auth/signin")
      .send({ email: signup.email, password: signup.password });
    expect(res.status).to.be.equal(200);
    const token = res.data;
  });
  it("should populate return 401 if the token is not provided", async () => {
    const response = await chai.request(app).get("/api/users");
    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal("Access denied. No token provided!");
  });
  it.skip("should populate return 401 if the token is invalid", async () => {
    const response = await chai
      .request(app)
      .header("x-auth-token", "invalidtoken")
      .get("/api/users");
    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal("Access denied. No token provided!");
  });
  it.skip("should populate return 200 if valid token is provided", async () => {
    const response = await chai
      .request(app)
      .get("/api/users")
      .header("x-auth-token", "invalidtoken");

    expect(response.status).to.equal(200);
  });
});
