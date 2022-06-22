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
    console.log(fakeCall.request);
    fakeCall.request.setProperty("user", user);
    const response = await fakeCall.sendRequest();
    console.log(response);
    expect(response.status).to.be.equal(200);
  });
  after(async () => {
    await User.destroy({ where: {} });
  });
});
