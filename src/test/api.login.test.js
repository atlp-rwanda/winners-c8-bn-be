import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import { User } from "../database/models";
import { signup } from "./mocks/Users";
import Protection from "../middlewares/hash";
const { hashPassword, signToken } = Protection;
chai.use(chaiHttp);

let authTokenTest = "";
describe("POST login", async () => {
  before(async () => {
    await User.destroy({ where: {} });
    signup.unhashedPassword = signup.password;
    signup.password = hashPassword(signup.password);
    await User.create({ ...signup });
    authTokenTest = await signToken({ ...signup });
  });
  it("should not login with a non-verified email", async () => {
    const res = await chai
      .request(app)
      .post("/api/auth/signin")
      .send({ email: signup.email, password: signup.unhashedPassword });
    expect(res.status).to.be.equal(403);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("message", "User email is not verified!");
  });
  it('it should verify user in the database', async () => {
		const res = await chai
			.request(app)
			.get('/api/auth/register/verifyuser/'+authTokenTest)
			.send();
        
		expect(res.status).to.be.equal(201);
		expect(res.body).to.have.property(
			'message',
			'User verified successfully',
		);
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
    expect(res.status).to.be.equal(401);
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
    signup.password = signup.unhashedPassword;
    delete signup.unhashedPassword;
  });
});
