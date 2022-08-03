import chai, { expect } from "chai";
import request from "supertest";
import models from "../database/models";
import server from "../index";
import Protection from "../middlewares/hash";
import { signup } from "./mocks/Users";
import userSeeder from "./util/userSeeder";

const { hashPassword, verifyToken } = Protection;

const { User } = { ...models };

describe("api/users", async () => {
  let url = "/api/users/";

  const adminMock = { ...signup };
  const user = {
    token: null,
  };
  const loginAdmin = {
    email: 'honore@gmail.com',
    password: 'This@2022'
  }
  const admin = {
    token: null,
  };

  adminMock.user_role = "013dddd7-2769-4de6-8fc3-7aa527114879";
  adminMock.email = "admin@gmail.com";

  before(async () => {
    try {
      await User.destroy({ where: {} });

      await User.create({
        ...adminMock,
        password: hashPassword(signup.password),
        isVerified: true,
      });
     const loginAdmin = {
      email: "nyakamweaimable@gmail.com",
      password: "Tester@12345",
     }
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
    } catch (error) {
      console.error({ error });
    }
  });

  describe("GET /", () => {
    it("should return 401 if user is not logged in", async () => {
      const res = await request(server).get(url);

      expect(res.status).to.be.eq(401);
    });

    it("should return 401 if provided token is invalid", async () => {
      const token = "a"; 

      const res = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.be.eq(401);
    });
  it('It should get all users in application with status 200', async () => {
    const res = await request(server)
    .get(url)
    .set("Authorization", `Bearer ${admin.token}`);

  expect(res.status).to.be.eq(200);
});

});
})