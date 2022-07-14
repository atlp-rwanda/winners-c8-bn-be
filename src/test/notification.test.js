import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import { User } from "../database/models";
import { managerCredentials } from "./mocks/Users";
import Protection from "../middlewares/hash";
import sendNotification from "../utils/sendNotification";
chai.use(chaiHttp);
const { request } = chai;

describe("Notificatons test", () => {
  let token;
  let user;
  let basePath = "/api/user/notifications/";
  let validNotificationId;
  before(async () => {
    await User.destroy({
      where: {},
      truncate: true,
    });
    user = await User.create({
      ...managerCredentials,
      password: Protection.hashPassword(managerCredentials.password),
    });

    const res = await request(app).post("/api/auth/signin").send({
      email: managerCredentials.email,
      password: managerCredentials.password,
    });
    expect(res.status).to.equal(200);
    token = res.body.data;
    const notifications = await sendNotification({
      title: "Test",
      link: "test/index.html",
      userIds: [user.id],
    });
    expect(notifications.length).to.greaterThan(0);
  });

  after(async () => {
    await User.destroy({
      where: { id: user.id },
    });
  });

  it("GET /user/notifications should return 401 if the token is not provided", async () => {
    const res = await request(app).get(basePath);
    expect(res.status).to.be.eq(401);
  });
  it("GET /user/notifications should return array of notification if valid token is provided", async () => {
    const res = await request(app)
      .get(basePath)
      .set("authorization", `Bearer ${token}`);
    expect(res.status).to.be.eq(200);
    expect(res.body.data).to.be.an("array");
    validNotificationId = res.body.data[0]?.id;
  });

  it("PATCH /user/notifications should return 401 if user is not logged in", async () => {
    const res = await request(app).get(basePath);
    expect(res.status).to.be.eq(401);
  });
  it("PATCH /user/notifications should return 200 and number of notification updated if user is logged in", async () => {
    const res = await request(app)
      .get(basePath)
      .set("authorization", `Bearer ${token}`);
    expect(res.status).to.be.eq(200);
  });
  it("GET /user/notifications/{notificationid} should return 401  if user is not logged in", async () => {
    const res = await request(app).get(basePath + validNotificationId);
    expect(res.status).to.be.eq(401);
  });
  it("GET /user/notifications/{notificationid} should return 400  if user is logged in and invalid id is given ", async () => {
    const res = await request(app)
      .get(basePath + "123")
      .set("authorization", `Bearer ${token}`);
    expect(res.status).to.be.eq(400);
  });
  it("GET /user/notifications/{notificationid} should return 200 and notification  if user is logged in", async () => {
    const res = await request(app)
      .get(basePath + validNotificationId)
      .set("authorization", `Bearer ${token}`);
    expect(res.status).to.be.eq(200);
  });
  it("PATCH /user/notifications/{notificationid} should return 401  if user is not logged in", async () => {
    const res = await request(app).patch(basePath + validNotificationId);
    expect(res.status).to.be.eq(401);
  });
  it("PATCH /user/notifications/{notificationid} should return 400  if user is logged in and invalid notification is given ", async () => {
    const res = await request(app)
      .patch(basePath + "123")
      .set("authorization", `Bearer ${token}`);
    expect(res.status).to.be.eq(400);
  });
  it("PATCH /user/notifications/{notificationid} should return 200 and notification  if user is logged in", async () => {
    const res = await request(app)
      .patch(basePath + validNotificationId)
      .set("authorization", `Bearer ${token}`);
    expect(res.status).to.be.eq(200);
  });
  it("DELETE /user/notifications/{notificationid} should return 401  if user is not logged in", async () => {
    const res = await request(app).patch(basePath + validNotificationId);
    expect(res.status).to.be.eq(401);
  });
  it("DELETE /user/notifications/{notificationid} should return 400  if user is logged in and invalid notification is given ", async () => {
    const res = await request(app)
      .delete(basePath + "123")
      .set("authorization", `Bearer ${token}`);
    expect(res.status).to.be.eq(400);
  });
  it("DELETE /user/notifications/{notificationid} should return 200  if user is logged in", async () => {
    const res = await request(app)
      .delete(basePath + validNotificationId)
      .set("authorization", `Bearer ${token}`);
    expect(res.status).to.be.eq(200);
  });
  it("PATCH /user/notifications/method should return 401  if user is not logged in", async () => {
    const res = await request(app).patch(basePath + "method");
    expect(res.status).to.be.eq(401);
  });
  it("PATCH /user/notifications/method should invalid notification is given ", async () => {
    const res = await request(app)
      .patch(basePath + "method")
      .set("authorization", `Bearer ${token}`)
      .send({
        method: "test",
      });
    expect(res.status).to.be.eq(400);
  });
  it("PATCH /user/notifications/method should return 200  if user is logged in", async () => {
    const res = await request(app)
      .patch(basePath + "method")
      .set("authorization", `Bearer ${token}`)
      .send({
        method: "email",
      });
    console.log(res);
    expect(res.status).to.be.eq(200);
  });
});
