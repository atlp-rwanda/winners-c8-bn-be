import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
chai.use(chaiHttp);

import { User, Role } from "../database/models";
import { adminCredentials, signup } from "./mocks/Users";
import { travel } from "./mocks/roles-mocks";
import Protection from "../middlewares/hash";
const { hashPassword } = Protection;

let userToken;
let adminToken;
let accom_id;
let room_id;

describe('POST/rooms/{roomId}/booking', ()=>{
    let url = "/api/accommodations/";
    let url2 = `/api/accommodations/${accom_id}/rooms/`

    before(async ()=>{
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
            password: hashPassword(signup.password),
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
    it("login requester user", async () => {
        const res = await chai.request(app).post("/api/auth/signin").send({
          email: signup.email,
          password: signup.password,
        });
    
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        userToken = res.body.data;
    });
    it("it should create an accommodation facility", async () => {
        const res = await chai
          .request(app)
          .post(url)
          .field("name", 'New Bees')
          .field("description", 'A fake place you can imagine')
          .field("location_id", "1")
          .field("latitude", "10")
          .field("longitude", "20")
          .attach("accommodation_image","./src/test/mocks/files/accommodation_images/house.jpg","house.jpg")
          .set("Authorization", `Bearer ${adminToken}`);
        accom_id = res.body.data.id
        expect(res.status).to.be.eq(201);
    });

    it("should return 201, after creating a room in an accommodation facility", async () => {
        const res = await chai
          .request(app)
          .post(`/api/accommodations/${accom_id}/rooms/`)
          .field("bed_type", 'small')
          .field("cost", '7546')
          .attach("room_image","./src/test/mocks/files/accommodation_images/room.png","room.png")
          .set("Authorization", `Bearer ${adminToken}`);
          room_id= res.body.data.id
        expect(res.status).to.be.eq(201);
      });

    it('it should book room when user is requester only', async ()=>{
        const res = await chai
            .request(app)
            .post(`/api/rooms/${room_id}/booking`)
            .set("Authorization", `Bearer ${userToken}`);
            // .set('Authorization', `Bearer ${userToken}`)
            // console.log(userToken)
            console.log(res.body)
    })
    
})