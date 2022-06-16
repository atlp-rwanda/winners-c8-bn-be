import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import { User } from "../database/models";
import { signup } from "./mocks/Users";
import Protection from "../middlewares/hash";
const { hashPassword } = Protection;
chai.use(chaiHttp);

describe.skip("POST /auth/logout", async () => {
  let token;
  before(async () => {
    await User.destroy({ where: {} });
    signup.unhashedPassword = signup.password;
    signup.password = hashPassword(signup.password);
    await User.create({ ...signup });
    const res = await chai
      .request(app)
      .post("/api/auth/signin")
      .send({ email: signup.email, password: signup.unhashedPassword });
    expect(res.status).to.be.equal(200);
    token = res.body.data;
  });
  it("should not logout if user is not logged in", async () => {
    const res = await chai.request(app).post("/api/auth/signout").send();
    expect(res.status).to.be.equal(409);
    expect(res.body.error).to.be.equal();
  });
  it("should logout user given the token", async () => {});
  after(async () => {
    await User.destroy({ where: {} });
  });
});
