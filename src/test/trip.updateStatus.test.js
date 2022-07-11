import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import { User, Location, Accommodation, TripRequest } from "../database/models";
import {
  adminCredentials,
  managerCredentials,
  requesterCredentials,
} from "./mocks/Users";
import locationSeeder from "./util/locationSeeder";
import tripRequestSeeder from "./util/tripRequestSeeder";
import accommodationSeeder from "./util/accommodationSeeder";
import Protection from "../middlewares/hash";
chai.use(chaiHttp);
const { request } = chai;

describe("PUT /trips/{tripId}/status", () => {
  let tripRequests;
  let baseUrl = "/api/trips/";
  let adminToken;
  let requesterToken;
  let managerToken;
  before(async () => {
    let res;

    await User.destroy({
      where: {},
      truncate: true,
    });
    await Location.destroy({ where: {}, truncate: true });
    await User.create({
      ...adminCredentials,
      password: Protection.hashPassword(adminCredentials.password),
    });
    const manager = await User.create({
      ...managerCredentials,
      password: Protection.hashPassword(managerCredentials.password),
    });
    const requester = await User.create({
      ...requesterCredentials,
      password: Protection.hashPassword(requesterCredentials.password),
    });
    await locationSeeder();
    await accommodationSeeder();
    tripRequests = await tripRequestSeeder(
      requester.id,
      requesterCredentials.managerId
    );
    //Login all the type of user
    res = await request(app).post("/api/auth/signin").send({
      email: managerCredentials.email,
      password: managerCredentials.password,
    });
    expect(res.status).to.equal(200);
    managerToken = res.body.data;
    res = await request(app).post("/api/auth/signin").send({
      email: requesterCredentials.email,
      password: requesterCredentials.password,
    });
    expect(res.status).to.equal(200);
    requesterToken = res.body.data;
    res = await request(app).post("/api/auth/signin").send({
      email: adminCredentials.email,
      password: adminCredentials.password,
    });
    expect(res.status).to.equal(200);
    adminToken = res.body.data;
  });

  after(async () => {
    await User.destroy({
      where: {},
      truncate: true,
    });
    await Location.destroy({ where: {}, truncate: true });
    await Accommodation.destroy({ where: {} });
    await TripRequest.destroy({ where: {}, truncate: true });
  });

  it("should return 401 if user does not provide token(Not logged in)", async () => {
    const res = await request(app).put(baseUrl + 1 + "/status");
    expect(res.status).to.be.eq(401);
  });

  it("should return 400 if invalid status is given", async () => {
    const res = await request(app)
      .put(baseUrl + 1 + "/status")
      .send({ status: "testing" })
      .set("Authorization", `Bearer ${managerToken}`);

    expect(res.status).to.be.equal(400);
  });

  it("should return 404 if the trip request is not found", async () => {
    const res = await request(app)
      .put(baseUrl + 1000 + "/status")
      .send({ status: "Approved" })
      .set("Authorization", `Bearer ${managerToken}`);
    expect(res.status).to.be.eq(404);
  });

  it("should return 403, if the current user is not the manager of the trip request", async () => {
    let res = await request(app)
      .put(baseUrl + tripRequests[0].id + "/status")
      .send({ status: "Approved" })
      .set("Authorization", `Bearer ${requesterToken}`);
    expect(res.status).to.equal(403);
    res = await request(app)
      .put(baseUrl + tripRequests[1].id + "/status")
      .send({ status: "Approved" })
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).to.equal(403);
  });
  it("should return 200, If successful  manager approve or reject  the trip request", async () => {
    let res = await request(app)
      .put(baseUrl + tripRequests[0].id + "/status")
      .send({ status: "Approved" })
      .set("Authorization", `Bearer ${managerToken}`);
    expect(res.status).to.equal(200);
    res = await request(app)
      .put(baseUrl + tripRequests[1].id + "/status")
      .send({ status: "Rejected" })
      .set("Authorization", `Bearer ${managerToken}`);
    expect(res.status).to.equal(200);
    res = await request(app)
      .put(baseUrl + tripRequests[2].id + "/status")
      .send({ status: "Rejected" })
      .set("Authorization", `Bearer ${managerToken}`);
    expect(res.status).to.equal(200);
  });
});
