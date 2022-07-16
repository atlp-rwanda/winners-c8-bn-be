import chai, { expect } from "chai";
// import request from "supertest";
import models from "../database/models";
import server from "../index";
import Protection from "../middlewares/hash";
import { signup } from "./mocks/Users";
import userSeeder from "./util/userSeeder";
import accommodationSeeder from "./util/accommodationSeeder";
import accommodationRoomSeeder from "./util/accommodationRoomSeeder";
import locationSeeder from "./util/locationSeeder";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const { request } = chai;

const { hashPassword, verifyToken } = Protection;

const { Location, Accommodation, AccommodationRoom, User } = { ...models };
let user;
let admin;
let userToken;
let adminToken;

describe("api/accommodations/", async () => {
  let url = "/api/accommodations/";

  const adminMock = { ...signup };
  const user = {
    token: null,
    data: null,
  };
  const admin = {
    token: null,
    data: null,
  };

  adminMock.user_role = "d01c0e35-b0ec-4724-85d5-48c2ecc995e7";
  adminMock.email = "admin4@gmail.com";
  // Create tables in the test databases
  before(async () => {
    await Location.destroy({ where: {} });
    let locations = await locationSeeder();
    try {
      await AccommodationRoom.destroy({ where: {} });
      await Accommodation.destroy({ where: {} });
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

      // await accommodationSeeder();

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
      await AccommodationRoom.destroy({ where: {} });
      await User.destroy({ where: {} });
      await Accommodation.destroy({ where: {} });
      await Location.destroy({ where: {} });
    } catch (error) {
      console.error({ error });
    }
  });

  // afterEach(async () => {
  //   try {
  //     await TripRequest.sync({ force: true });
  //   } catch (err) {
  //     console.log({ err });
  //   }
  // });

  describe("POST /", () => {
    it("should return 403 if user is not travel admin", async () => {
      const res = await request(server)
        .post(url)
        .set("Authorization", `Bearer ${user.token}`);

      expect(res.status).to.be.eq(403);
    });

    it("should return 400 if input form validations are violated", async () => {
      const res = await request(server)
        .post(url)
        .field("name", "New Bees")
        .field("description", "A fake place you can imagine")
        .field("location_id", "-1000")
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(400);
    });

    it("should return 404 when location_id does not exist", async () => {
      const res = await request(server)
        .post(url)
        .field("name", "New Bees")
        .field("description", "A fake place you can imagine")
        .field("location_id", "-1000")
        .field("latitude", "10")
        .field("longitude", "20")
        .attach(
          "accommodation_image",
          "./src/test/mocks/files/accommodation_images/house.jpg",
          "house.jpg"
        )
        .set("Authorization", `Bearer ${admin.token}`);
      expect(res.status).to.be.eq(404);
    });

    it("should return 201, if all validations are passing", async () => {
      const res = await request(server)
        .post(url)
        .field("name", "New Bees")
        .field("description", "A fake place you can imagine")
        .field("location_id", "1")
        .field("latitude", "10")
        .field("longitude", "20")
        .attach(
          "accommodation_image",
          "./src/test/mocks/files/accommodation_images/house.jpg",
          "house.jpg"
        )
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(201);
    });
  });

  describe("GET /", () => {
    before(async () => {
      // let locations = await locationSeeder();
      try {
        await AccommodationRoom.destroy({ where: {} });
        await Accommodation.destroy({ where: {} });
        await accommodationSeeder();
      } catch (error) {
        console.error({ error });
      }
    });
    it("should return 200 code with all accommodations", async () => {
      const res = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(200);
    });

    it("should return 200 code with a single accommodation, id = 1", async () => {
      const res = await request(server)
        .get(url + "1")
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(200);
    });

    it("should return 404 code when accommodation id does not exist", async () => {
      const res = await request(server)
        .get(url + "-100")
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(404);
    });
  });

  describe("PATCH /", () => {
    it("should return 400 if input form validations are violated", async () => {
      const res = await request(server)
        .patch(url + 1)
        .send({ name: 12345 })
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(400);
    });

    it("should return 404 when location_id does not exist", async () => {
      const res = await request(server)
        .patch(url + 1)
        .field("name", "New Bees")
        .field("description", "A fake place you can imagine")
        .field("location_id", "-1000")
        .field("latitude", "10")
        .field("longitude", "20")
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 404, if the accommodation_id does not exist", async () => {
      const res = await request(server)
        .patch(url + "-123244")
        .field("name", "New Bees")
        .field("description", "A fake place you can imagine")
        .field("location_id", "1")
        .field("latitude", "10")
        .field("longitude", "20")
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should RETURN 201, if all validations are passing", async () => {
      // console.log("\n\n\n the url is :", url);
      const res = await request(server)
        .patch(url + 1)
        .field("name", "New Bees")
        .field("description", "A fake place you can imagine")
        .field("location_id", "1")
        .field("latitude", "10")
        .field("longitude", "20")
        .attach(
          "accommodation_image",
          "./src/test/mocks/files/accommodation_images/house.jpg",
          "house.jpg"
        )
        .set("Authorization", `Bearer ${admin.token}`);
      // console.log({status: res.status, body: res.body})
      expect(res.status).to.be.eq(201);
    });

    it("should RETURN 201, if all validations are passing (using JSON)", async () => {
      // console.log("\n\n\n the url is :", url);
      const res = await request(server)
        .patch(url + 1)
        .send({
          add_on_services: [
            {
              name: "Car",
              details: "A five-seats car is proviced.",
            },
            {
              name: "Pool",
              details: "a 3x3x3 metres swimming pool.",
            },
          ],
          amenities: [
            {
              name: "Car",
              details: "A five-seats car is proviced.",
            },
            {
              name: "Pool",
              details: "a 3x3x3 metres swimming pool.",
            },
          ],
          images_links: [
            "https://freesvg.org/img/SC0007.Scribble-house.png",
            "https://freesvg.org/img/maison2.png",
          ],
        })
        .set("Authorization", `Bearer ${admin.token}`);
      // console.log({status: res.status, body: res.body})
      expect(res.status).to.be.eq(201);
    });
  });

  describe("DELETE /", async () => {
    it("should return 404 if accommodation_id does not exit", async () => {
      const res = await request(server)
        .delete(url + "-12121")
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 200 on a successful deletion", async () => {
      const res = await request(server)
        .delete(url + 1)
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(200);
    });
  });

  describe("POST /{accommodation_id}/like", () => {
    before(async () => {
      // let locations = await locationSeeder();
      try {
        await AccommodationRoom.destroy({ where: {} });
        await Accommodation.destroy({ where: {} });
        await accommodationSeeder();
      } catch (error) {
        console.error({ error });
      }
    });

    it("should return 401 if no token is provided", async () => {
      const res = await request(server).post(`${url}/1/like`);

      expect(res.status).to.be.eq(401);
    });

    it("should return 404 if accommodation is not found", async () => {
      const res = await request(server)
        .post(`${url}/100000/like`)
        .set("Authorization", `Bearer ${user.token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 403 if user is not a requester", async () => {
      const res = await request(server)
        .post(`${url}/1/like`)
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(403);
    });

    it("should return 200 on a successful like", async () => {
      const accommodations = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${user.token}`);
        
      const accommodation = accommodations.body.data[0];

      const res = await request(server)
        .post(`${url}/${accommodation.id}/like`)
        .set("Authorization", `Bearer ${user.token}`);

      const likedAccommodation = await request(server)
        .get(`${url}/${accommodation.id}`)
        .set("Authorization", `Bearer ${user.token}`);

      expect(res.status).to.be.eq(200);
      expect(likedAccommodation.body.data.isLiked).be.true;
    });

    it("should return 200 on a successful dislike", async () => {
      const accommodations = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${user.token}`);

      const accommodation = accommodations.body.data[0];

      await request(server).post(`${url}/${accommodation.id}/like`);

      const res = await request(server)
        .post(`${url}/${accommodation.id}/like`)
        .set("Authorization", `Bearer ${user.token}`);

      const disLikedAccommodation = await request(server)
        .get(`${url}/${accommodation.id}`)
        .set("Authorization", `Bearer ${user.token}`);

      expect(res.status).to.be.eq(200);
      expect(disLikedAccommodation.body.data.isLiked).be.false;
    });
  });
});

describe("api/accommodations/{accommodation_id}/rooms", async () => {
  let url = "/api/accommodations/1/rooms/";

  const adminMock = { ...signup };
  const user = {
    token: null,
    data: null,
  };
  const admin = {
    token: null,
    data: null,
  };

  adminMock.user_role = "d01c0e35-b0ec-4724-85d5-48c2ecc995e7";
  adminMock.email = "admin4@gmail.com";
  // Create tables in the test databases
  before(async () => {
    await Location.destroy({ where: {} });
    let locations = await locationSeeder();
    try {
      await AccommodationRoom.destroy({ where: {} });
      await Accommodation.destroy({ where: {} });
      await User.destroy({ where: {} });
      await accommodationSeeder();

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

      // await accommodationSeeder();

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
      await AccommodationRoom.destroy({ where: {} });
      await User.destroy({ where: {} });
      await Accommodation.destroy({ where: {} });
      await Location.destroy({ where: {} });
    } catch (error) {
      console.error({ error });
    }
  });

  // afterEach(async () => {
  //   try {
  //     await TripRequest.sync({ force: true });
  //   } catch (err) {
  //     console.log({ err });
  //   }
  // });

  describe("POST /", () => {
    it("should return 400 if input form validations are violated", async () => {
      const res = await request(server)
        .post(url)
        .field("name", "New Bees")
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(400);
    });

    it("should return 404 when accommodation_id does not exist", async () => {
      let url = "/api/accommodations/-100/rooms";
      const res = await request(server)
        .post(url)
        .field("bed_type", "small")
        .field("cost", "7993")
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 201, if all validations are passing", async () => {
      const res = await request(server)
        .post(url)
        .field("bed_type", "small")
        .field("cost", "7546")
        .attach(
          "room_image",
          "./src/test/mocks/files/accommodation_images/room.png",
          "room.png"
        )
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(201);
    });
  });

  describe("GET /", () => {
    it("should return 200 code with all rooms with accommodation_id = 1", async () => {
      const res = await request(server)
        .get(url)
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(200);
    });
  });

  describe("PATCH /", () => {
    before(async () => {
      try {
        await AccommodationRoom.destroy({ where: {} });
        await accommodationRoomSeeder();
      } catch (error) {
        console.log({ error });
      }
    });

    it("should return 400 if input form validations are violated", async () => {
      const res = await request(server)
        .patch(url + 1)
        .field("name", "New Bees")
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(400);
    });

    it("should return 404 when accommodation_id does not exist", async () => {
      let url = "/api/accommodations/-100/rooms/";
      const res = await request(server)
        .patch(url + 1)
        .field("bed_type", "small")
        .field("cost", "7993")
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 404 when accommodation_id (in body) does not exist", async () => {
      const res = await request(server)
        .patch(url + 1)
        .field("accommodation_id", "-100")
        .field("bed_type", "small")
        .field("cost", "7993")
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 201, if all validations are passing", async () => {
      const res = await request(server)
        .patch(url + 1)
        .field("bed_type", "small")
        .field("cost", "7546")
        .attach(
          "room_image",
          "./src/test/mocks/files/accommodation_images/room.png",
          "room.png"
        )
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(201);
    });

    it("should return 201, if all validations are passing (using JSON)", async () => {
      const res = await request(server)
        .patch(url + 1)
        .send({
          images_links: [
            "https://freesvg.org/img/SC0007.Scribble-house.png",
            "https://freesvg.org/img/maison2.png",
          ],
        })
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(201);
    });
  });

  describe("DELETE /", async () => {
    it("should return 404 if room_id does not exit", async () => {
      const res = await request(server)
        .delete(url + "-12121")
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(404);
    });

    it("should return 200 on a successful deletion", async () => {
      const res = await request(server)
        .delete(url + 1)
        .set("Authorization", `Bearer ${admin.token}`);

      expect(res.status).to.be.eq(200);
    });
  });
});
