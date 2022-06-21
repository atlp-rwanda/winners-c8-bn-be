import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import { User } from "../database/models";
import { signup } from "./mocks/Users";
import Protection from "../middlewares/hash";
const { hashPassword } = Protection;
chai.use(chaiHttp);

describe("POST /auth/logout", async () => {
  let token;
  let user;
  before(async () => {
    await User.destroy({ where: {} });
    user = await User.create({
      ...signup,
      password: hashPassword(signup.password),
      verified: true,
    });
    const res = await chai
      .request(app)
      .post("/api/auth/signin")
      .send({ email: signup.email, password: signup.password });
    expect(res.status).to.be.equal(200);
    token = res.body.data;
  });
  it("should not logout if user is not logged in", async () => {
    const res = await chai.request(app).put("/api/auth/signout").send();
    expect(res.status).to.be.equal(401);
    expect(res.body.message).to.equal("Access denied. No token provided!");
  });
  it("should logout user given the token valid token and user", async () => {
    const res = await chai
      .request(app)
      .put("/api/auth/signout")
      .set("x-auth-token", token);
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal("User logged out successful");
  });
});

describe("GET /auth/sessions", () => {
  let token;
  let user;
  before(async () => {
    await User.destroy({ where: {} });
    user = await User.create({
      ...signup,
      password: hashPassword(signup.password),
      verified: true,
    });
    const res = await chai
      .request(app)
      .post("/api/auth/signin")
      .send({ email: signup.email, password: signup.password });
    expect(res.status).to.be.equal(200);
    token = res.body.data;
  });
  it("should allow the user to delete some sessions", async () => {
    let response;

    response = await chai
      .request(app)
      .get("/api/auth/sessions")
      .set("x-auth-token", token);
    expect(response.status).to.be.equal(200);
    const sessionId = response.body.data[0].id;
    response = await chai
      .request(app)
      .delete("/api/auth/sessions/" + sessionId)
      .set("x-auth-token", token);
    expect(response.status).to.be.equal(200);
  });
  after(async () => {
    await User.destroy({ where: {} });
  });
});
