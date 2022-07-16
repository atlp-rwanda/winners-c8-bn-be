import chai, { expect } from "chai";
import UserService from "../services/user";
import chaiHttp from "chai-http";
import app from "../index";
chai.use(chaiHttp);

import { User, Role } from "../database/models";
import { adminCredentials, signup, managerCredentials } from "./mocks/Users";
import { travel } from "./mocks/roles-mocks";
import Protection from "../middlewares/hash";
const { hashPassword, verifyToken } = Protection;

let adminToken = "";

describe("PATCH Update manager of User", () => {
  before(async () => {
    await User.create({
      firstName: adminCredentials.firstName,
      lastName: adminCredentials.lastName,
      email: adminCredentials.email,
      password: hashPassword(adminCredentials.password),
      user_role: adminCredentials.user_role,
      isVerified: true,
    });

    await User.create({
      firstName: managerCredentials.firstName,
      lastName: managerCredentials.lastName,
      email: managerCredentials.email,
      password: hashPassword(managerCredentials.password),
      user_role: managerCredentials.user_role,
      isVerified: true,
    });

    await User.create({
      firstName: signup.firstName,
      lastName: signup.lastName,
      email: signup.email,
      password: hashPassword(adminCredentials.password),
      isVerified: true,
    });
  });

  after(async () => {
    await User.destroy({ where: {} });
  });

  it("login admin user", async () => {
    const res = await chai.request(app).post("/api/auth/signin").send({
      email: adminCredentials.email,
      password: adminCredentials.password,
    });

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a("object");
    adminToken = res.body.data;
  });

  it("it should not update manager of non exist user", async () => {
    const res = await chai
      .request(app)
      .patch("/api/users/assignManager")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Content-Type", "application/json")
      .send({
        email: "maby.com",
        managerId: "12f",
      });

    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("message");
  });

  it("returns 400 if user does not provide one of the required fields", async () => {
    const res = await chai
      .request(app)
      .patch("/api/users/assignManager")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Content-Type", "application/json")
      .send({
        email: "maby.com",
      });

    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("error");
  });

  it("it should not update user for user is not manager", async () => {
    const admin = await verifyToken(adminToken);
    const res = await chai
      .request(app)
      .patch("/api/users/assignManager")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Content-Type", "application/json")
      .send({
        email: signup.email,
        managerId: admin.id,
      });

    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("message");
  });

  it("it should update user manager", async () => {
    const managers = await UserService.findAllManagers();
    const managerId = managers[0].id;
    // console.log(managerId);
    const res = await chai
      .request(app)
      .patch("/api/users/assignManager")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Content-Type", "application/json")
      .send({
        email: signup.email,
        managerId: managerId,
      });

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("message");
  });

  it("it should return all managers of the application", async () => {
    const res = await chai
      .request(app)
      .get("/api/users/managers")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.body).to.be.a("object");
    expect(res.status).to.be.equal(200);
  });
});
