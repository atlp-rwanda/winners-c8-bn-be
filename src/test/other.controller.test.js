import { expect } from "chai";
import Auth from "../controllers/Authcontrollers";
import FakeControllerCall from "./util/FakeControllerCall";
describe("fakeCall Auth.signup ", async () => {
  const fakeCall = new FakeControllerCall(Auth.signup);
  it("controller catch the error, body not defined", async () => {
    const response = await fakeCall.sendRequest();
    expect(response.status).to.equal(500);
  });
});
describe("controller Auth.signin catch error ", async () => {
  const fakeCall = new FakeControllerCall(Auth.signin);
  it("should catch the error, body not defined", async () => {
    const response = await fakeCall.sendRequest();
    expect(response.status).to.equal(500);
  });
});
describe("controller Auth.signout catch error ", async () => {
  const fakeCall = new FakeControllerCall(Auth.signout);
  it("should catch the error, body not defined", async () => {
    const response = await fakeCall.sendRequest();
    expect(response.status).to.equal(500);
  });
});
