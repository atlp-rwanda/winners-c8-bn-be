import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import models from "../database/models";
import ChatService from "../services/chatServices";
import { newChat } from "./mocks/chats-mocks";

chai.use(chaiHttp);

describe("GET /users/chats", () => {
  before(async () => {
    await ChatService.saveMessage(newChat);
  });
  it("it should return all past public chats", async () => {
    const response = await chai.request(app).get("/api/users/chats");
    expect(response.body).to.be.a("object");
    expect(response.status).to.be.eq(200);
    expect(response.body).to.haveOwnProperty("chats");
  });
  after(async () => {
    await models.Chat.destroy({ where: {} });
  });
});
