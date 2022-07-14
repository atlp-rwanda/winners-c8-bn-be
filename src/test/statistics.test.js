import chai, { expect } from "chai";
import server from "../index";
import models from "../database/models";
import { signup } from "./mocks/Users";
import Protection from "../middlewares/hash";

import chaiHttp from "chai-http";

chai.use(chaiHttp);
const { request } = chai;
const { User } = { ...models };
const { hashPassword } = Protection;

let testUser = {};
const adminMock = { ...signup };
adminMock.user_role = "d01c0e35-b0ec-4724-85d5-48c2ecc995e7";
adminMock.email = "testing225@gmail.com";

describe("api/trips/tripstatistics", async () => {

  describe("GET /", () => {
    before(async () => {
        // let locations = await locationSeeder();
        try {
            testUser= await User.create({
                ...adminMock,
                password: hashPassword(signup.password),
                isVerified: true,
              });
        }
        catch(error){
          console.error({ error });
        }
      }
    );
    it("should return 500 code when none existing userId provided", async () => {
        let url = "/api/trips/tripstatistics/";
      const res = await request(server).get(url)

      expect(res.status).to.be.eq(500);
    });

    it("should return 200 code when existing userId provided", async () => {
        let url = "/api/trips/tripstatistics/"
      const res = await request(server).get(url)

      expect(res.status).to.be.eq(200);
    });

  });
});


describe("api/trips/managerstatistics", async () => {

    describe("GET /", () => {
      after(async () => {
          try {

            await User.destroy({ where: {} });

          }
          catch(error){
            console.error({ error });
          }
        }
      );
      it("should return 500 code when none existing userId provided", async () => {
          let url = "/api/trips/managerstatistics/" + testUser.id + "123";
        const res = await request(server).get(url)
  
        expect(res.status).to.be.eq(500);
      });
  
      it("should return 200 code when existing userId provided", async () => {
          let url = "/api/trips/managerstatistics/" + testUser.id;
        const res = await request(server).get(url)
  
        expect(res.status).to.be.eq(200);
      });
  
    });
  });