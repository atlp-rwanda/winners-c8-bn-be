import chai from "chai";
import request from "supertest";
import models from "../database/models";
import sequelize from "../database";
import Sequelize from "sequelize";
const env = process.env.NODE_ENV || "test";
const config = require("../database/config/config.js")[env];

const { TripRequest, Accommodation, User } = { ...models };

const expect = chai.expect;

describe("api/trip", async () => {
  let server;
  let url = "/api/trip/";

  // Create tables in the test databases
  before(async () => {
    try {
      await TripRequest.sync({ force: true });
      await Accommodation.sync({ force: true });
      await User.sync({ force: true });
      await userSeeder();
      await accommodationSeeder();
    } catch (error) {
      console.error({ error });
    }
  });

  after(async () => {
    try {
      await User.truncate({ cascade: true });
      await Accommodation.truncate({ cascade: true });
    } catch (error) {
      console.error({ error });
    }
  });

  beforeEach(() => {
    server = require("../index");
  });

  afterEach(async () => {
    try {
      await TripRequest.sync({ force: true });
    } catch (err) {
      console.log({ err });
    }
    server.close();
  });

  describe("GET /", () => {
    it("should return 401 if user does not provide token(Not logged in)", async () => {
      const res = await request(server).get(url);

      expect(res.status).to.be.eq(401);
    });

    it("should return 401 if token is invalid", async () => {
      const token = "a"; // Invalid token

      const res = await await request(server)
        .get(url)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(401);
    });

    it("should return 200, and all posts that belong to the user", async () => {
      const token = 2;
      const posts = await tripRequestSeeder();

      const res = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(200);
      expect(res.body.every((t) => t.ownerId === 2)).to.be.true;
    });

    it("should return 200, and all posts that belong to the manager", async () => {
      const token = 1; // User is a manager
      const posts = await tripRequestSeeder();

      const res = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(200);
      expect(res.body.every((t) => t.managerId === 1)).to.be.true;
    });
  });

  describe("GET /:tripId", () => {
    it("should return 401 if user does not provide token(Not logged in)", async () => {
      const res = await request(server).get(url);

      expect(res.status).to.be.eq(401);
    });

    it("should return 401 if token is invalid", async () => {
      const token = "a"; // Invalid token

      const res = await await request(server)
        .get(url)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(401);
    });

    it("should return 404 if the trip request is not found", async () => {
      // Seed trip requests
      const tripRequests = await tripRequestSeeder();
      const tripRequestId = 777; //Invalid trip request id
      const token = 2;

      const res = await request(server)
        .get(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 403, if the current user is not the owner of the trip request", async () => {
      const token = 3;
      const tripRequests = await tripRequestSeeder();
      const tripRequestId = tripRequests[1].id;

      const res = await request(server)
        .get(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(403);
    });

    it("Should return 200, if successful in retrieving the trip request for user", async () => {
      const tripRequests = await tripRequestSeeder();
      const tripRequestId = tripRequests[1].id;
      const token = tripRequests[1].ownerId;

      const res = await request(server)
        .get(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(200);
      expect(res.body.id).to.be.eq(tripRequestId);
      expect(res.body.ownerId).to.be.eq(tripRequests[1].ownerId);
    });

    it("Should return 200, if successful in retrieving the trip request for manager", async () => {
      const tripRequests = await tripRequestSeeder();
      const tripRequestId = tripRequests[1].id;
      const token = 1;

      const res = await request(server)
        .get(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(200);
      expect(res.body.id).to.be.eq(tripRequestId);
      expect(res.body.managerId).to.be.eq(tripRequests[1].managerId);
    });
  });

  describe("POST /", () => {
    it("should return 401 if user does not provide token(Not logged in)", async () => {
      const res = await request(server).post(url);

      expect(res.status).to.be.eq(401);
    });

    it("should return 401 if token is invalid", async () => {
      const token = "a"; // Invalid token

      const res = await await request(server)
        .post(url)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(401);
    });

    it("should return 400 if some fields are missing or invalid in trip requst", async () => {
      const token = "1";
      const tripRequest = noDepartureTripRequest(); // Does not contain departure field which is required

      const res = await request(server)
        .post(url)
        .send(tripRequest)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(400);
      expect(res.body.error).to.include("departure");
    });

    it("should return 201, if successful", async () => {
      const token = 2;
      const tripRequest = fullTripRequest();

      const res = await request(server)
        .post(url)
        .send(tripRequest)
        .set("Authorization", `Bearer ${token}`);

      const tripRequestFromDb = await TripRequest.findOne({
        where: {
          departure: tripRequest.departure,
        },
      });

      expect(res.status).to.be.eq(201);
      expect(tripRequestFromDb).to.not.be.null;
      expect(tripRequestFromDb.destination).to.be.eq(tripRequest.destination);
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
      const token = "1";
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
      const tripRequests = await tripRequestSeeder();
      const tripRequestId = 777; //Invalid trip request id
      const token = 2;
      const tripRequestToUpdate = fullTripRequest();

      const res = await request(server)
        .put(url + tripRequestId)
        .send(tripRequestToUpdate)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 403, if the current user is not the owner of the trip request", async () => {
      const token = 3; // token for user who is not the owner of the trip request
      const tripRequests = await tripRequestSeeder();
      const tripRequestId = tripRequests[1].id;
      const tripRequestToUpdate = fullTripRequest();

      const res = await request(server)
        .put(url + tripRequestId)
        .send(tripRequestToUpdate)
        .set("Authorization", `Bearer ${token}`);

      const tripAfterUpdate = await TripRequest.findOne({
        where: { id: tripRequestId },
      });
      expect(res.status).to.be.eq(403);
      expect(tripAfterUpdate.departure).to.not.be.eq(
        tripRequestToUpdate.departure
      );
    });

    it("should return 403, IF trip request does not have status of pending", async () => {
      const token = 2;
      const tripRequests = await tripRequestSeeder();
      const tripRequestId = tripRequests[2].id;
      const tripRequestToUpdate = fullTripRequest();

      const res = await request(server)
        .put(url + tripRequestId)
        .send(tripRequestToUpdate)
        .set("Authorization", `Bearer ${token}`);

      const tripAfterUpdate = await TripRequest.findOne({
        where: { id: tripRequestId },
      });
      expect(res.status).to.be.eq(403);
      expect(tripAfterUpdate.status).to.not.be.eq("pending");
    });

    it("should return 201, If successful to update the trip request", async () => {
      const token = 2;
      const tripRequests = await tripRequestSeeder();
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
      expect(tripAfterUpdate.departure).to.not.be.eq(tripRequests[1].departure);
      expect(tripAfterUpdate.departure).to.be.eq(tripRequestToUpdate.departure);
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
      const tripRequests = await tripRequestSeeder();
      const tripRequestId = 777; //Invalid trip request id
      const token = 2;

      const res = await request(server)
        .delete(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 403, if the current user is not the owner of the trip request", async () => {
      const token = 3; // token for user who is not the owner of the trip request
      const tripRequests = await tripRequestSeeder();
      const tripRequestId = tripRequests[1].id;

      const res = await request(server)
        .delete(url + tripRequestId)
        .set("Authorization", `Bearer ${token}`);

      const tripAfterUpdate = await TripRequest.findOne({
        where: { id: tripRequestId },
      });
      expect(res.status).to.be.eq(403);
      expect(tripAfterUpdate.departure).to.not.be.null;
    });

    it("should return 403, IF trip request does not have status of pending", async () => {
      const token = 2;
      const tripRequests = await tripRequestSeeder();
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
      const token = 2;
      const tripRequests = await tripRequestSeeder();
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

// Function for seeding users in the test database for testing
const userSeeder = async () => {
  const users = User.bulkCreate([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@test.com",
      user_role: "manager",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@test.com",
      user_role: "requester",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Jacob Doe",
      email: "jacob.doe@test.com",
      user_role: "requester",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  return users;
};

// Function for seeding accommodations in the test database for testing
const accommodationSeeder = async () => {
  const accommodations = await Accommodation.bulkCreate([
    {
      id: 1,
      name: "Toronto Hotel",
      address: "capital street, Toronto, Ontario",
      country: "Canada",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Reethi beach resort",
      address: "Reethi Beach, Fonimagoodhoo Island 20215",
      country: "Maldives",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  return accommodations;
};

const tripRequestSeeder = async () => {
  try {
    const tripRequests = TripRequest.bulkCreate([
      {
        id: 1,
        departure: "kigali",
        destination: "toronto",
        travel_reason: "Studying my bachelor degree",
        accommodationId: 1,
        dateOfDeparture: "2022-07-17",
        dateOfReturn: null,
        status: "pending",
        tripType: "oneway",
        ownerId: 2,
        managerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        departure: "kigali",
        destination: "maladives",
        travel_reason: "Tourism",
        accommodationId: 1,
        dateOfDeparture: "2022-07-17",
        dateOfReturn: "2022-07-27",
        status: "pending",
        tripType: "return",
        ownerId: 2,
        managerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        departure: "kigali",
        destination: "maladives",
        travel_reason: "Tourism",
        accommodationId: 1,
        dateOfDeparture: "2022-07-17",
        dateOfReturn: "2022-07-27",
        status: "approved",
        tripType: "return",
        ownerId: 3,
        managerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    return tripRequests;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const noDepartureTripRequest = () => {
  return {
    destination: "toronto",
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: "2022-07-17",
    dateOfReturn: null,
  };
};

const fullTripRequest = () => {
  return {
    departure: "nairobi",
    destination: "toronto",
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: "2022-07-17",
    dateOfReturn: "2022-07-27",
  };
};
