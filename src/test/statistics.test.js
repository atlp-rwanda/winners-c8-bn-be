import chai, { expect } from "chai";
import server from "../index";
import models from "../database/models";
import { signup } from "./mocks/Users";
import Protection from "../middlewares/hash";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

const { request } = chai;
const { User } = { ...models };
const { hashPassword,verifyToken } = Protection;

let testUser = {};
const adminMock = { ...signup };
adminMock.user_role = "6927442b-84fb-4fc3-b799-11449fa62f52";
adminMock.email = "testing225@gmail.com";

describe("api/trips/managerstatistics", async () => {

  describe("POST /", () => {
    let admin = {};
    before(async () => {
        try {
            testUser= await User.create({
                ...adminMock,
                password: hashPassword(signup.password),
                isVerified: true,
              });
              const res = await request(server)
        .post("/api/auth/signin")
        .send({ email: adminMock.email, password: signup.password });

      admin.token = res.body.data;
      admin.data = await verifyToken(admin.token);
        }
        catch(error){
          console.error({ error });
        }
      }
    );
    it("should return 401 code when none existing userId provided", async () => {
        let url = "/api/trips/managerstatistics/";
      const res = await request(server).post(url)
      expect(res.status).to.be.eq(401);
    });

    it("should return 200 code when existing userId provided", async () => {
        let url = "/api/trips/managerstatistics/"
      const res = await request(server).post(url).set('Authorization', `Bearer ${admin.token}`)
      expect(res.status).to.be.eq(200);
    });

  });
});


describe("api/trips/tripstatistics", async () => {
 let user = {};
    describe("POST /", () => {
      before(async () => {
          try {

            await User.destroy({ where: {} });
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
          }

          catch(error){
            console.error({ error });
          }
        }
      );
      after(async () =>{
        await User.destroy({ where: {} });
      })
      it("should return 401 code when no user loged in", async () => {
          let url = "/api/trips/tripstatistics/";
        const res = await request(server).post(url)
        expect(res.status).to.be.eq(401);
      });
  
      it("should return 200 code when existing userId provided", async () => {
          let url = "/api/trips/tripstatistics/";
        const res = await request(server).post(url).set('Authorization', `Bearer ${user.token}`)
        expect(res.status).to.be.eq(200);
      });
  
    });
  });