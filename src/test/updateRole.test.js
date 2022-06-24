import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
chai.use(chaiHttp);

import { User, Role } from "../database/models";
import { adminCredentials, signup } from "./mocks/Users";
import { travel } from "./mocks/roles-mocks";
import Protection from "../middlewares/hash";
const { hashPassword } = Protection;

let adminToken = "";

describe("PATCH Update role of User", () => {
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
      firstName: signup.firstName,
      lastName: signup.lastName,
      email: signup.email,
      password: hashPassword(adminCredentials.password),
      isVerified: true,
    });
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

  it("it should not update role of non exist user", async () => {
    const res = await chai
      .request(app)
      .patch("/api/v1/users/assignRole")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Content-Type", "application/json")
      .send({
        email: "maby.com",
        roleId: "d01c0e35-b0ec-4724-85d6-48c2ecc995e7",
      });

    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.be.equal("user doesn't exist");
  });

  it("it should not update user for invalid role", async () => {
    const res = await chai
      .request(app)
      .patch("/api/v1/users/assignRole")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Content-Type", "application/json")
      .send({
        email: signup.email,
        roleId: "12f",
      });

    expect(res.status).to.be.equal(500);
  });

  it("it should not update user for non exist role", async () => {
    const res = await chai
      .request(app)
      .patch("/api/v1/users/assignRole")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Content-Type", "application/json")
      .send({
        email: signup.email,
        roleId: "f01c0e35-b0ec-f724-85d6-48c2ecc995ef",
      });

    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.be.equal(
      "role you want to assign does not exist"
    );
  });

  it("it should update user role", async () => {
    const res = await chai
      .request(app)
      .patch("/api/v1/users/assignRole")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Content-Type", "application/json")
      .send({
        email: signup.email,
        roleId: travel.id,
      });

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.a("object");
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.be.equal("User role updated succesfully!");
  });

  after(async () => {
    await User.destroy({ where: {} });
    await Role.destroy({ where: {} });
  });
});
