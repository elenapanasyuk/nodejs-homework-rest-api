const express = require("express");
const router = express.Router();
const contactsController = require("../../controller/index");
const validate = require("../../services/validation");

router
  .get("/", contactsController.listContacts)
  .post("/", validate.schemaContactValidation, contactsController.addContact);

router
  .get("/:contactId", contactsController.getContactById)
  .delete("/:contactId", contactsController.removeContact)
  .patch(
    "/:contactId",
    validate.schemaContactValidation,
    contactsController.updateContact
  );

module.exports = router;
