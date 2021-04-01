const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
require("dotenv").config();
const { User, newUser } = require("../model/__mocks__/data");

const SECRET_KEY = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

jest.mock("../model/contacts.js");
jest.mock("../model/users.js");

describe("Testing: route api/users/auth", () => {
  it("Registration should return status 201 ", async () => {
    const res = await request(app)
      .post("/api/users/auth/register")
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toEqual(201);
    expect(res.body).toBeDefined();
  });

  it("Email has already been used should return status 409", async () => {
    const res = await request(app)
      .post("/api/users/auth/register")
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toEqual(409);
    expect(res.body).toBeDefined();
  });

  it("Login should return status 200", async () => {
    const res = await request(app)
      .post("/api/users/auth/login")
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it("Login should return status 400", async () => {
    const res = await request(app)
      .post("/api/users/auth/login")
      .send({ email: "mail@mail.com", password: "9999" })
      .set("Accept", "application/json");

    expect(res.status).toEqual(400);
    expect(res.body).toBeDefined();
  });

  it("Valid token for current user should return status 200", async () => {
    const res = await request(app)
      .get("/api/users/current")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it("Absence of token for current user should return status 401", async () => {
    const res = await request(app)
      .get(`/api/users/current`)
      .set("Authorization", "");

    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();
  });

  it("Invalid token for current user should return status 401", async () => {
    const res = await request(app)
      .get(`/api/users/current`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();
  });

  it("Upload avatar should return status 200", async () => {
    const buffer = await fs.readFile("./test/test-avatar.jpg");
    const res = await request(app)
      .patch("/api/users/avatars")
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", buffer, "test-avatar.jpg");

    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.data).toHaveProperty("avatarUrl");
  });
  it("Invalid token while uploading avatar should return status 401", async () => {
    const buffer = await fs.readFile("./test/test-avatar.jpg");
    const res = await request(app)
      .patch(`/api/users/avatars`)
      .set("Authorization", `Bearer ${1111}`)
      .attach("avatar", buffer, "test-avatar.jpg");

    expect(res.status).toEqual(401);
  });
});
