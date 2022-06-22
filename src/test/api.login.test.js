import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import { User } from "../database/models";
import { signup } from "./mocks/Users";
import { hashSync } from "bcrypt";
import Protection from "../middlewares/hash";
const { hashPassword } = Protection;
chai.use(chaiHttp);

describe("POST login", async () => {
  before(async () => {
    await User.destroy({ where: {} });
    signup.unhashedPassword = signup.password;
    signup.password = hashPassword(signup.password);
    await User.create({ ...signup });
  });
  it("should not login the user without  email and  password", async () => {
    let res = await chai.request(app).post("/api/auth/signin").send();
    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("error", "email is required");
    res = await chai
      .request(app)
      .post("/api/auth/signin")
      .send({ email: "test@test.com" });
    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("error", "password is required");
  });
  it("should not login the user who doesn't exists", async () => {
    const res = await chai
      .request(app)
      .post("/api/auth/signin")
      .send({ email: "invalid@test.com", password: "none" });
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("message", "User not found!");
  });
  it("should not login the user with the invalid password", async () => {
    const res = await chai
      .request(app)
      .post("/api/auth/signin")
      .send({ email: signup.email, password: "invalid password" });
    expect(res.status).to.be.equal(409);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("message", "Invalid credentials");
  });
  it("it should login the user given valid credentials", async () => {
    const res = await chai
      .request(app)
      .post("/api/auth/signin")
      .send({ email: signup.email, password: signup.unhashedPassword });
    console.log(res.body);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a("object");
  });
  after(async () => {
    await User.destroy({ where: {} });
  });
});
