import chai from "chai";
import chaiHttp from "chai-http";
import server from "..";

//Assertion
const { expect } = chai;
//Enable endpoints testing
chai.use(chaiHttp);

//Test if Root End Point is Working
describe("/GET root endpoint", () => {
  it("it should GET root endpoint", async () => {
    const response = await chai.request(server).get("/");
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.equal("Hello World!");
  });
  it("it should GET api root endpoint", async () => {
    const response = await chai.request(server).get("/api");
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.equal("Welcome to winner api!");
  });
});
