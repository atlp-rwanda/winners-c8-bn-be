import chai, { expect } from "chai";
import request from "supertest";
import models from "../database/models";
import server from "../index";
import Protection from "../middlewares/hash";
import { signup } from "./mocks/Users";
import userSeeder from "./util/userSeeder";
import accommodationSeeder from "./util/accommodationSeeder";
import locationSeeder from "./util/locationSeeder";
import tripRequestSeeder from "./util/tripRequestSeeder";
import {
  noDepartureTripRequest,
  oneWayTripRequest,
  fullTripRequest,
} from "./mocks/TripRequests";

const { hashPassword, verifyToken } = Protection;

const { TripRequest, Accommodation, User } = { ...models };
let user;
let manager;
let userToken;
let managerToken;

describe("api/trips", async () => {
  let url = "/api/trips/";

  const managerMock = { ...signup };
  const user = {
    token: null,
    data: null,
  };
  const manager = {
    token: null,
    data: null,
  };

  managerMock.user_role = "6927442b-84fb-4fc3-b799-11449fa62f52";
  managerMock.email = "manager@gmail.com";
  // Create tables in the test databases
  before(async () => {
    let locations = await locationSeeder();
    try {
      await TripRequest.sync({ force: true });
      await Accommodation.destroy({ where: {} });
      await User.destroy({ where: {} });

      await User.create({
        ...managerMock,
        password: hashPassword(signup.password),
        isVerified: true,
      });

      const res = await request(server)
        .post("/api/auth/signin")
        .send({ email: managerMock.email, password: signup.password });

      manager.token = res.body.data;
      manager.data = await verifyToken(manager.token);

      await accommodationSeeder();

      await User.create({
        ...signup,
        managerId: manager.data.id,
        password: hashPassword(signup.password),
        isVerified: true,
      });
      const resUser = await request(server)
        .post("/api/auth/signin")
        .send({ email: signup.email, password: signup.password });

      user.token = resUser.body.data;
      user.data = await verifyToken(user.token);
    } catch (error) {
      console.log({ error });
    }
  });

  after(async () => {
    try {
      await User.destroy({ where: {} });
      await Accommodation.destroy({ where: {} });
    } catch (error) {
      console.error({ error });
    }
  });

  afterEach(async () => {
    try {
      await TripRequest.sync({ force: true });
    } catch (err) {
      console.log({ err });
    }
  });

  describe("GET /", () => {
    it("should return 401 if user does not provide token(Not logged in)", async () => {
      const res = await request(server).get(url);

      expect(res.status).to.be.eq(401);
    });

    it("should return 401 if token is invalid", async () => {
      const token = "a"; // Invalid token

      const res = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(401);
    });

    it("should return 200, and all trips that belong to the user", async () => {
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );
      const res = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${user.token}`);

      expect(res.status).to.be.eq(200);
      expect(res.body.every((t) => t.owner.id === user.data.id)).to.be.true;
    });

    it("should return 200, and all trips that belong to the manager", async () => {
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );

      const res = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${manager.token}`);

      expect(res.status).to.be.eq(200);
      expect(res.body.every((t) => t.manager.id === manager.data.id)).to.be
        .true;
    });
  });

  describe("GET /:tripId", () => {
    it("should return 401 if user does not provide token(Not logged in)", async () => {
      const res = await request(server).get(url);

      expect(res.status).to.be.eq(401);
    });

    it("should return 401 if token is invalid", async () => {
      const token = "a"; // Invalid token

      const res = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(401);
    });

    it("should return 404 if the trip request is not found", async () => {
      // Seed trip requests
      await tripRequestSeeder(user.data.id, manager.data.id);
      const tripRequestId = "777";
      const token = user.token;

      const res = await request(server)
        .get(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 403, if the current user is not the owner of the trip request", async () => {
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );
      // Create new User
      const userMock = { ...signup };
      userMock.firstName = "Jacob";
      userMock.email = "jacob@gmail.com";

      await User.create({
        ...userMock,
        password: hashPassword(signup.password),
        isVerified: true,
      });
      const resUser = await request(server)
        .post("/api/auth/signin")
        .send({ email: userMock.email, password: userMock.password });

      const token = resUser.body.data;

      const tripRequestId = tripRequests[1].id;

      const res = await request(server)
        .get(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(403);
    });

    it("should return 403, if the current manager is not the direct manager of the owner of the trip request", async () => {
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );
      // Create new User
      const userMock = { ...managerMock };
      userMock.firstName = "manager";
      userMock.email = "admin2@gmail.com";

      await User.create({
        ...userMock,
        password: hashPassword(signup.password),
        isVerified: true,
      });

      const resLogin = await request(server)
        .post("/api/auth/signin")
        .send({ email: userMock.email, password: userMock.password });

      const token = resLogin.body.data;

      const tripRequestId = tripRequests[1].id;

      const res = await request(server)
        .get(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(403);
    });

    it("Should return 200, if successful in retrieving the trip request for user", async () => {
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );
      const tripRequestId = tripRequests[1].id;
      const token = user.token;

      const res = await request(server)
        .get(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(200);
      expect(res.body.id).to.be.eq(tripRequestId);
      expect(res.body.owner.id).to.be.eq(tripRequests[1].ownerId);
    });

    it("Should return 200, if successful in retrieving the trip request for manager", async () => {
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );
      const tripRequestId = tripRequests[1].id;
      const token = manager.token;

      const res = await request(server)
        .get(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(200);
      expect(res.body.id).to.be.eq(tripRequestId);
      expect(res.body.manager.id).to.be.eq(tripRequests[1].managerId);
    });
  });

  describe("POST /", () => {
    it("should return 401 if user does not provide token(Not logged in)", async () => {
      const res = await request(server).post(url);

      expect(res.status).to.be.eq(401);
    });

    it("should return 401 if token is invalid", async () => {
      const token = "a"; // Invalid token

      const res = await request(server)
        .post(url)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(401);
    });

    it("should return 400 if some fields are missing or invalid in trip requst", async () => {
      const token = user.token;
      const tripRequest = noDepartureTripRequest(); // Does not contain departure field which is required

      const res = await request(server)
        .post(url)
        .send(tripRequest)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(400);
      expect(res.body.error).to.include("departure");
    });

    it("should return 400, if DepartureId is not valid", async () => {
      const token = user.token;
      const tripRequest = fullTripRequest();
      tripRequest.departureId = 777;
      const res = await request(server)
        .post(url)
        .send(tripRequest)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(400);
    });

    it("should return 400, if DestinationId is not valid", async () => {
      const token = user.token;
      const tripRequest = fullTripRequest();
      tripRequest.destinationsId = [777];
      const res = await request(server)
        .post(url)
        .send(tripRequest)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(400);
    });

    it("should return 201, if successful", async () => {
      const token = user.token;
      const tripRequest = fullTripRequest();
      await request(server)
        .post(url)
        .send(oneWayTripRequest())
        .set("Authorization", `Bearer ${token}`);

      const res = await request(server)
        .post(url)
        .send(tripRequest)
        .set("Authorization", `Bearer ${token}`);

      const tripRequestFromDb = await TripRequest.findOne({
        where: {
          departureId: tripRequest.departureId,
        },
      });

      expect(res.status).to.be.eq(201);
      expect(tripRequestFromDb).to.not.be.null;
      expect(tripRequestFromDb.dateOfDeparture).to.be.eq(
        tripRequest.dateOfDeparture
      );
    });
  });

  describe("PUT /:tripId", () => {
    it("should return 401 if user does not provide token(Not logged in)", async () => {
      const res = await request(server).put(url + 1);

      expect(res.status).to.be.eq(401);
    });

    it("should return 401 if token is invalid", async () => {
      const token = "a"; // Invalid token

      const res = await request(server)
        .put(url + 1)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(401);
    });

    it("should return 400 if some fields are missing or invalid in trip requst", async () => {
      const token = user.token;
      const tripRequest = noDepartureTripRequest(); // Does not contain departure field which is required

      const res = await request(server)
        .put(url + 1)
        .send(tripRequest)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(400);
      expect(res.body.error).to.include("departure");
    });

    it("should return 404 if the trip request is not found", async () => {
      // Seed trip requests
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );
      const tripRequestId = 777; //Invalid trip request id
      const token = user.token;
      const tripRequestToUpdate = fullTripRequest();

      const res = await request(server)
        .put(url + tripRequestId)
        .send(tripRequestToUpdate)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).to.be.eq(404);
    });

    it("should return 403, if the current user is not the owner of the trip request", async () => {
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );

      const tripRequestId = tripRequests[1].id;
      const tripRequestToUpdate = fullTripRequest();
      // Create new User
      const userMock = { ...signup };
      userMock.firstName = "";
      userMock.email = "jacob2@gmail.com";

      await User.create({
        ...userMock,
        password: hashPassword(signup.password),
        isVerified: true,
      });

      const resUser = await request(server)
        .post("/api/auth/signin")
        .send({ email: userMock.email, password: userMock.password });

      const token = resUser.body.data;

      const res = await request(server)
        .put(url + tripRequestId)
        .send(tripRequestToUpdate)
        .set("Authorization", `Bearer ${token}`);

      const tripAfterUpdate = await TripRequest.findOne({
        where: { id: tripRequestId },
      });
      expect(res.status).to.be.eq(403);
      expect(tripAfterUpdate.departureId).to.not.be.eq(
        tripRequestToUpdate.departureId
      );
    });


    it("should return 400, if DepartureId is not valid", async () => {
      const token = user.token;
      const tripRequest = fullTripRequest();
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );
      const tripRequestId = tripRequests[1].id;
      tripRequest.departureId = 777;
      const res = await request(server)
        .put(url + tripRequestId)
        .send(tripRequest)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(400);
    });

    it("should return 400, if DestinationId is not valid", async () => {
      const token = user.token;
      const tripRequest = fullTripRequest();
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );
      const tripRequestId = tripRequests[1].id;
      tripRequest.destinationsId = 777;
      const res = await request(server)
        .put(url + tripRequestId)
        .send(tripRequest)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).to.be.eq(400);
    });

    it("should return 201, If successful to update the trip request", async () => {
      const token = user.token;
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );
      const tripRequestId = tripRequests[1].id;
      const tripRequestToUpdate = fullTripRequest();
      const res = await request(server)
        .put(url + tripRequestId)
        .send(tripRequestToUpdate)
        .set("Authorization", `Bearer ${token}`);

      const tripAfterUpdate = await TripRequest.findOne({
        where: { id: tripRequestId },
      });

      expect(res.status).to.be.eq(201);
      expect(tripAfterUpdate.departureId).to.not.be.eq(
        tripRequests[1].departureId
      );
      expect(tripAfterUpdate.departureId).to.be.eq(
        tripRequestToUpdate.departureId
      );
    });
  });

  describe("DELETE /", async () => {
    it("should return 401 if user does not provide token(Not logged in)", async () => {
      const res = await request(server).delete(url + 1);

      expect(res.status).to.be.eq(401);
    });

    it("should return 401 if token is invalid", async () => {
      const token = "a"; // Invalid token

      const res = await request(server)
        .delete(url + 1)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(401);
    });

    it("should return 404 if the trip request is not found", async () => {
      // Seed trip requests
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );
      const tripRequestId = 777; //Invalid trip request id
      const token = user.token;

      const res = await request(server)
        .delete(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 403, if the current user is not the owner of the trip request", async () => {
      // Create new User
      const userMock = { ...signup };
      userMock.firstName = "";
      userMock.email = "jacob3@gmail.com";

      await User.create({
        ...userMock,
        password: hashPassword(signup.password),
        isVerified: true,
      });

      const resUser = await request(server)
        .post("/api/auth/signin")
        .send({ email: userMock.email, password: userMock.password });

      const token = resUser.body.data; // token for user who is not the owner of the trip request
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );
      const tripRequestId = tripRequests[1].id;

      const res = await request(server)
        .delete(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      const tripAfterUpdate = await TripRequest.findOne({
        where: { id: tripRequestId },
      });
      expect(res.status).to.be.eq(403);
      expect(tripAfterUpdate.departureId).to.not.be.null;
    });

    it("should return 403, IF trip request does not have status of pending", async () => {
      const token = user.token;
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );
      const tripRequestId = tripRequests[2].id;

      const res = await request(server)
        .delete(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      const tripAfterUpdate = await TripRequest.findOne({
        where: { id: tripRequestId },
      });
      expect(res.status).to.be.eq(403);
      expect(tripAfterUpdate.status).to.not.be.eq("pending");
    });

    it("should return 200,If trip request successfully deleted", async () => {
      const token = user.token;
      const tripRequests = await tripRequestSeeder(
        user.data.id,
        manager.data.id
      );
      const tripRequestId = tripRequests[1].id;

      const res = await request(server)
        .delete(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      const tripAfterUpdate = await TripRequest.findOne({
        where: { id: tripRequestId },
      });
      expect(res.status).to.be.eq(200);
      expect(tripAfterUpdate).to.be.null;
    });
  });
});
