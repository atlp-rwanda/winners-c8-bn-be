import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import models from "../database/models";
chai.use(chaiHttp);
import accommodationSeeder from "./util/accommodationSeeder";
import accommodationRoomSeeder from "./util/accommodationRoomSeeder";
import tripRequestSeeder from "./util/tripRequestSeeder";
const { Accommodation, AccommodationRoom, User } = { ...models };
import { adminCredentials, signup } from "./mocks/Users";
import Protection from "../middlewares/hash";
const { hashPassword } = Protection;

let userToken;
let adminToken;
let room_id=1;

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

        // create requester
        const userReq = await User.create({
            firstName: signup.firstName,
            lastName: signup.lastName,
            email: signup.email,
            password: hashPassword(signup.password),
            isVerified: true,
          });
          console.log(userReq)
        

      try{
      await AccommodationRoom.destroy({ where: {} });
      await Accommodation.destroy({ where: {} });
      await accommodationSeeder();
      await accommodationRoomSeeder(); 

      await tripRequestSeeder(userReq.id, userReq.managerId)
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
    
    // it('it should book room when user is requester only', async ()=>{
    //     const res = await chai
    //         .request(app)
    //         .post(`/api/rooms/${room_id}/booking`)
    //         .set("Authorization", `Bearer ${userToken}`);
    //         // .set('Authorization', `Bearer ${userToken}`)
    //         console.log(userToken);
    //         console.log(res);
    //         expect(res.body).to.be.a('object');
    // })
    
    after(async () => {
      await AccommodationRoom.destroy({ where: {} });
      await User.destroy({ where: {} });
      await Accommodation.destroy({ where: {} });
    });
})