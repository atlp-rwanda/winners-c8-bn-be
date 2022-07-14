import chai, { expect } from "chai";
import request from "supertest";
import models from "../database/models";
import server from "../index";
import Protection from "../middlewares/hash";
import { signup } from "./mocks/Users";
import locationSeeder from "./util/locationSeeder";
import { noCountryLocation, fullLocation } from "./mocks/Locations";

const { hashPassword, verifyToken } = Protection;

const { Location, User } = { ...models };
let user;

describe("api/locations", async () => {
  let url = "/api/locations/";

  const adminMock = { ...signup };
  const user = {
    token: null,
  };
  const admin = {
    token: null,
  };

  adminMock.user_role = "013dddd7-2769-4de6-8fc3-7aa527114879";
  adminMock.email = "admin@gmail.com";
  // Create tables in the test databases
  before(async () => {
    try {
      await Location.destroy({ where: {} });
      await User.destroy({ where: {} });

      await User.create({
        ...adminMock,
        password: hashPassword(signup.password),
        isVerified: true,
      });

      const res = await request(server)
        .post("/api/auth/signin")
        .send({ email: adminMock.email, password: signup.password });

      admin.token = res.body.data;
      admin.data = await verifyToken(admin.token);

      await User.create({
        ...signup,
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
      await Location.destroy({ where: {} });
    } catch (error) {
      console.error({ error });
    }
  });

  afterEach(async () => {
    try {
      await Location.destroy({ where: {} });
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

    it("should return 200, and all locations", async () => {
      const locations = await locationSeeder();
      const res = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(200);
    });
  });

  describe("GET /:locationId", () => {
    it("should return 401 if user does not provide token(Not logged in)", async () => {
      const res = await request(server).get(url + 1);

      expect(res.status).to.be.eq(401);
    });

    it("should return 401 if token is invalid", async () => {
      const token = "a"; // Invalid token

      const res = await request(server)
        .get(url + 1)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(401);
    });

    it("should return 404 if the location is not found", async () => {
      // Seed locations
      await locationSeeder();

      const locationId = "777";
      const token = admin.token;

      const res = await request(server)
        .get(url + locationId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(404);
    });

    it("Should return 200, if successful in retrieving the locaation", async () => {
      const locations = await locationSeeder();

      const token = admin.token;
      const locationId = locations[0].id;
      const res = await request(server)
        .get(url + locationId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(200);
      expect(res.body.data.id).to.be.eq(locationId);
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

    it("should return 403, if the current user is not super admin", async () => {
      const token = user.token;
      const res = await request(server)
        .post(url)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(400);
    });

    it("should return 400 if some fields are missing or invalid in trip requst", async () => {
      const token = admin.token;
      const location = noCountryLocation(); // Does not contain country field which is required

      const res = await request(server)
        .post(url)
        .send(location)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(400);
      expect(res.body.error).to.include("country");
    });

    it("should return 201, if successful", async () => {
      const token = admin.token;
      const location = fullLocation();

      const res = await request(server)
        .post(url)
        .send(location)
        .set("Authorization", `Bearer ${token}`);

      const locationFromDb = await Location.findOne({
        where: {
          city: location.city,
        },
      });

      expect(res.status).to.be.eq(201);
      expect(locationFromDb).to.not.be.null;
      expect(locationFromDb.country).to.be.eq(location.country);
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

    it("should return 403, if the current user is not super admin", async () => {
      const locations = await locationSeeder();

      const token = user.token;
      const locationId = locations[0].id;
      const res = await request(server)
        .put(url + locationId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(400);
    });

    it("should return 400 if some fields are missing or invalid in trip requst", async () => {
      const token = admin.token;
      const location = noCountryLocation(); // Does not contain country field which is required

      const res = await request(server)
        .put(url + 1)
        .send(location)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(400);
      expect(res.body.error).to.include("country");
    });

    it("should return 404 if the location is not found", async () => {
      // Seed locations
      await locationSeeder();

      const locationId = "777";
      const token = admin.token;
      const location = fullLocation();
      const res = await request(server)
        .put(url + locationId)
        .send(location)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 201, If successful to update the location", async () => {
      const token = admin.token;
      const locations = await locationSeeder();
      const locationId = locations[0].id;
      const locationToUpdate = fullLocation();

      const res = await request(server)
        .put(url + locationId)
        .send(locationToUpdate)
        .set("Authorization", `Bearer ${token}`);

      const tripAfterUpdate = await Location.findOne({
        where: { id: locationId },
      });

      expect(res.status).to.be.eq(201);
      expect(tripAfterUpdate.city).to.not.be.eq(locations[1].city);
      expect(tripAfterUpdate.city).to.be.eq(locationToUpdate.city);
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

    it("should return 403, if the current user is not super admin", async () => {
      const locations = await locationSeeder();

      const token = user.token;
      const locationId = locations[0].id;
      const res = await request(server)
        .delete(url + locationId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(201);
    });

    it("should return 404 if the location is not found", async () => {
      // Seed locations
      await locationSeeder();

      const locationId = "777";
      const token = admin.token;

      const res = await request(server)
        .delete(url + locationId)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 201,If location successfully deleted", async () => {
      const token = admin.token;
      const locations = await locationSeeder();
      const locationId = locations[1].id;

      const res = await request(server)
        .delete(url + locationId)
        .set("Authorization", `Bearer ${token}`);

      const locationAfterUpdate = await Location.findOne({
        where: { id: locationId },
      });
      expect(res.status).to.be.eq(201);
      expect(locationAfterUpdate).to.be.null;
    });
  });
});
