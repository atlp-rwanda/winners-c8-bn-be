import "dotenv/config";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";
import app from "../index";
import { signup } from "./mocks/Users";
import { User } from "../database/models";
import Protection from "../middlewares/hash";

dotenv.config();
chai.use(chaiHttp);

describe("Auth check middlewares", () => {
  let token;
  let user;
  before(async () => {
    await User.destroy({ where: {} });
    user = await User.create({
      ...signup,
      password: Protection.hashPassword(signup.password),
      verified: true,
    });
    const res = await chai
      .request(app)
      .post("/api/auth/signin")
      .send({ email: signup.email, password: signup.password });
    console.log(res.body);
    expect(res.status).to.be.equal(200);
    token = res.body.data;
  });
  it("should  return 409 if the token is not provided", async () => {
    const response = await chai.request(app).get("/api/users");
    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal("Access denied. No token provided!");
  });

  it("should populate return 401 if the token is invalid", async () => {
    const response = await chai
      .request(app)
      .get("/api/users")
      .set("authorization", "Bearer invalidtoken");
    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal("Access denied. Invalid token");
  });
  it("should  return 401 invalid user id token is provided", async () => {
    const response = await chai
      .request(app)
      .get("/api/users")
      .set(
        "authorization",
        `Bearer ${await Protection.signToken({
          id: "invalidid",
        })}`
      );
    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal("Access denied. Invalid token");
  });
  it("should  return 401 if the token provided is not recognized", async () => {
    const response = await chai
      .request(app)
      .get("/api/users")
      .set(
        "authorization",
        `Bearer ${await Protection.signToken({
          id: user.id,
        })}`
      );
    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal("Access denied. Invalid session!");
  });
  it("should populate return 200 if valid token is provided", async () => {
    const response = await chai
      .request(app)
      .get("/api/users")
      .set("authorization", `Bearer ${token}`);
    expect(response.status).to.equal(200);
  });
});
