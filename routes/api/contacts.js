const express = require("express");
const router = express.Router();
const Contacts = require("../../model/index");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contacts have been found",
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Contact has been found",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Contact has been added",
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
