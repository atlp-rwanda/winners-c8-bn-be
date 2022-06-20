import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import { User } from "../database/models";
import { signup } from "./mocks/Users";
import Protection from "../middlewares/hash";
import FakeControllerCall from "./util/FakeControllerCall";
import Auth from "../controllers/Authcontrollers";
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
    const res = await chai.request(app).post("/api/auth/signout").send();
    expect(res.status).to.be.equal(409);
    expect(res.body.error).to.be.equal();
  });
  it("should logout user given the token valid token and user", async () => {
    const fakeCall = new FakeControllerCall(Auth.signout);
    fakeCall.request.setProperty("headers", {
      authorization: `Bearer ${token}`,
    });
    fakeCall.request.setProperty("user", user);
    const response = await fakeCall.sendRequest();
    expect(response.status).to.be.equal(200);
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
  it("should logout user given the token valid token and user", async () => {
    const fakeCall = new FakeControllerCall(Auth.getUserSessions);
    fakeCall.request.setProperty("headers", {
      authorization: `Bearer ${token}`,
    });
    fakeCall.request.setProperty("user", user);
    const response = await fakeCall.sendRequest();
    expect(response.status).to.be.equal(200);
    expect(response.body.data).to.an("array");
    expect(response.body.data.length).to.equal(1);
  });
  it("should allow the user to delete some sessions", async () => {
    let response;

    const getSessionId = new FakeControllerCall(Auth.getUserSessions);
    getSessionId.request.setProperty("headers", {
      authorization: `Bearer ${token}`,
    });
    getSessionId.request.setProperty("user", user);
    response = await getSessionId.sendRequest();
    const sessionId = response.body.data[0].id;
    const fakeCall = new FakeControllerCall(Auth.removeSession);
    fakeCall.request.setProperty("headers", {
      authorization: `Bearer ${token}`,
    });
    fakeCall.request.setProperty("user", user);
    fakeCall.request.setProperty("params", {
      sessionId,
    });
    response = await fakeCall.sendRequest();
    expect(response.status).to.be.equal(200);
    expect(response.body.data).to.an("array");
  });
  after(async () => {
    await User.destroy({ where: {} });
  });
});
