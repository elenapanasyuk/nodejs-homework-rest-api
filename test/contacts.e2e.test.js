const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User, contacts, newContact } = require("../model/__mocks__/data");
const app = require("../app");

const SECRET_KEY = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

jest.mock("../model/contacts.js");
jest.mock("../model/users.js");

describe("Testing the route api/contacts", () => {
  let idNewContact;
  describe("Testing: get all contacts", () => {
    it("Get all contacts should return status 200", async (done) => {
      const res = await request(app)
        .get("/api/contacts")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contacts).toBeInstanceOf(Array);
      done();
    });

    it("Get contact by id should return status 200", async (done) => {
      const contact = contacts[0];
      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact).toHaveProperty("_id");
      expect(res.body.data.contact._id).toBe(contact._id);
      done();
    });
    it("Get contact with wrong id should return 404 status", async (done) => {
      const wrongId = 12345;
      const res = await request(app)
        .get(`/api/contacts/${wrongId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe("Testing: post request for creating contact", () => {
    it("Create contact should return status 201", async (done) => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set("Authorization", `Bearer ${token}`)
        .send(newContact)
        .set("Accept", "application/json");

      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      idNewContact = res.body.data.contact._id;
      done();
    });
    it("Wrong field should return 400 status", async (done) => {
      const res = await request(app)
        .post("/api/contacts")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...newContact, test: 1 })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
    it("Without required field name should return 400 status", async (done) => {
      const res = await request(app)
        .post("/api/contacts")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Simon" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
    it("Without required field email should return 400 status", async (done) => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set("Authorization", `Bearer ${token}`)
        .send({ email: "test@gmail.ua" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
    it("Without required field phone should return 400 status", async (done) => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set("Authorization", `Bearer ${token}`)
        .send({ phone: "111111111111" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe("Testing: patch request for updating contact", () => {
    it("Update contact should return status 200", async (done) => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Boris" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact.name).toBe("Boris");
      done();
    });

    it("Wrong id should return 404 status", async (done) => {
      const res = await request(app)
        .patch(`/api/contacts/${1234}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Simon" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
    it("Wrong subscription field should return 400 status", async (done) => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ subscription: "blablabla" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
    it("Wrong field should return 400 status", async (done) => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ test: "1" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe("Testing: remove contact", () => {
    it("Remove contact should return status 200", async (done) => {
      const res = await request(app)
        .delete(`/api/contacts/${idNewContact}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      done();
    });

    it("Wrong id should return 404 status", async (done) => {
      const res = await request(app)
        .delete(`/api/contacts/1234`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
  });
});
