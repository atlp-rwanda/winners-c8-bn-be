import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import dotenv from "dotenv";
import app from '../../src/index'
import { Authorization} from '../middlewares/Authorization'
dotenv.config();
chai.should();
chai.use(chaiHttp);


  describe("Auth check middlewares", () => {
    it("should populate request of user with decoded of valid JWT", async () => {
        const { body} = await chai
            .request(app)
            .get("/api/users")
            .send({ email: "honore@gmail.com", password: "123" });
            

      });
  });
