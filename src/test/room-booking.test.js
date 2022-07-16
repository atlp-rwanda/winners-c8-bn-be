import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import models from "../database/models";
chai.use(chaiHttp);
import accommodationSeeder from "./util/accommodationSeeder";
import accommodationRoomSeeder from "./util/accommodationRoomSeeder";
import tripRequestSeeder from "./util/tripRequestSeeder";
import locationSeeder from "./util/locationSeeder";
const { Accommodation, AccommodationRoom, User, TripRequest, Location} = { ...models };
import { adminCredentials, managerCredentials, signup } from "./mocks/Users";
import Protection from "../middlewares/hash";
const { hashPassword } = Protection;

let userToken;
let adminToken;
let room_id=1;
let tripId=3;
let managerToken;

describe('POST/rooms/{roomId}/booking', ()=>{

    before(async ()=>{
        await User.create({
            firstName: adminCredentials.firstName,
            lastName: adminCredentials.lastName,
            email: adminCredentials.email,
            password: hashPassword(adminCredentials.password),
            user_role: adminCredentials.user_role,
            isVerified: true,
        });
        const mgr = await User.create({
          ...managerCredentials,
          password:hashPassword(managerCredentials.password)
        });

        // create requester
        const userReq = await User.create({
            firstName: signup.firstName,
            lastName: signup.lastName,
            email: signup.email,
            managerId: mgr.id,
            password: hashPassword(signup.password),
            isVerified: true,
          });
          console.log(userReq)
        

      try{
      await AccommodationRoom.destroy({ where: {} });
      await Accommodation.destroy({ where: {} });
      await Location.destroy({where:{}});
      await locationSeeder();
      await accommodationSeeder();
      await accommodationRoomSeeder(); 
      await tripRequestSeeder(userReq.id, managerCredentials.id);

      } catch (error) {
        console.error({ error });
      }
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

    it("login requester user", async () => {
        const res = await chai.request(app).post("/api/auth/signin").send({
          email: signup.email,
          password: signup.password,
        });
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        userToken = res.body.data;
    });

    it("login manager user", async () => {
      const res = await chai.request(app).post("/api/auth/signin").send({
        email: managerCredentials.email,
        password: managerCredentials.password,
      });
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.a("object");
      managerToken = res.body.data;
  });

  // it("should return 201, if successful created the trip request", async () => {
  //   const tripRequest = fullTripRequest();
  //   await chai
  //     .request(app)
  //     .post("/api/trips/")
  //     .send(oneWayTripRequest())
  //     .set("Authorization", `Bearer ${userToken}`);

  //   const res = await request(app)
  //     .post("/api/trips/")
  //     .send(tripRequest)
  //     .set("Authorization", `Bearer ${userToken}`);

  //   const tripRequestFromDb = await TripRequest.findOne({
  //     where: {
  //       departureId: tripRequest.departureId,
  //     },
  //   });

  //   expect(res.status).to.be.eq(201);
  //   expect(tripRequestFromDb).to.not.be.null;
  //   expect(tripRequestFromDb.dateOfDeparture).to.be.eq(
  //     tripRequest.dateOfDeparture
  //   );
  // });

    
    it('it should book room when trip request is approved', async ()=>{
        const res = await chai
            .request(app)
            .post(`/api/rooms/${room_id}/booking`)
            .send({
              tripId,
              from:"2022-07-10", 
              to:"2022-07-10"
            })
            .set("Authorization", `Bearer ${userToken}`);
            expect(res.status).to.be.eq(201);
    })
    
    after(async () => {
      await AccommodationRoom.destroy({ where: {} });
      await User.destroy({ where: {} });
      await Accommodation.destroy({ where: {} });
      await Location.destroy({where:{}});
    });
})