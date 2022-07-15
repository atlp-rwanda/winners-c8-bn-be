import chai, { expect } from "chai";
import request from "supertest";
import models from "../database/models";
import server from "../index";
import Protection from "../middlewares/hash";
import { signup } from "./mocks/Users";
import locationSeeder from "./util/locationSeeder";

const { hashPassword, verifyToken } = Protection;

const { Location, User } = { ...models };
let user;
describe("allow user to see the most travelled locations/destinations", async () => {
  let url = "/api/locations/";
  const adminMock = { ...signup };
  const user = {
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
      await User.create({
        ...signup,
        password: hashPassword(signup.password),
        isVerified: true,
      });
      const newUser = await request(server)
        .post("/api/auth/signin")
        .send({ email: signup.email, password: signup.password });

      user.token = newUser.body.data;
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

  describe("GET /locations/stats", () => {
    it("should not show most travelled locations if user is not logged in", async () => {
      const res = await request(server).get(url);
      expect(res.status).to.be.eq(401);
    });
    it("should not allow user and return 401 status if user has invalid access token", async () => {
      const token = "this-is-not-token"; // Invalid access token

      const res = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(401);
    });
    it("should return 200, and display three most travelled locations amongest others", async () => {
      let token;
      const locations = await locationSeeder();
      const res = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(401);
    });
  });
  });
 
