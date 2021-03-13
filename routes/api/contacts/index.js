const express = require("express");
const router = express.Router();
const contactsController = require("../../../controller/contacts");
const { schemaContactValidation } = require("./validation");
const guard = require("../../../helpers/guard");

router
  .get("/", guard, contactsController.listContacts)
  .post("/", guard, schemaContactValidation, contactsController.addContact);

router
  .get("/:contactId", guard, contactsController.getContactById)
  .delete("/:contactId", guard, contactsController.removeContact)
  .patch(
    "/:contactId",
    guard,
    schemaContactValidation,
    contactsController.updateContact
  );

module.exports = router;
