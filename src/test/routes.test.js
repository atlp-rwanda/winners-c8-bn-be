process.env.PORT = undefined;
import chai,{expect} from 'chai';
import ChaiHttp from 'chai-http';
import server from '../index';
chai.use(ChaiHttp);
import 'dotenv/config';


//Test if Root End Point is Working
describe("/GET root endpoint", () => {

    it("it should GET root endpoint", async () => {
      const response = await chai.request(server).get("/");
      expect(response).to.have.status(200);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.equal("Hello World!");
    });

    it("it should GET all users endpoint", async () => {
        const response = await chai.request(server).get("/api/users");
        expect(response).to.have.status(200);
    });
    
});
