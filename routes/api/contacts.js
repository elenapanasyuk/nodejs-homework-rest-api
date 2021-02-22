const express = require("express");
const router = express.Router();
const Contacts = require("../../model/index");
const validate = require("../../services/validation");

router.get("/", async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.status(200).json({
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
        message: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", validate.createContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
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
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Contact has been removed",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", validate.updateContact, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({
        status: "Bad request",
        code: 400,
        message: "Missing Fields",
      });
    }
    const contact = await Contacts.updateContact(contactId, body);
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Contact has been updated!",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
