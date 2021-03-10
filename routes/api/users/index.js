const express = require("express");
const router = express.Router();
const userController = require("../../../controller/users");
const { validateUser, validateUserSubscription } = require("./validation");
const guard = require("../../../helpers/guard");
const { createAccountLimiter } = require("../../../helpers/rate-limit-reg");

router.post(
  "/auth/register",
  validateUser,
  createAccountLimiter,
  userController.register
);
router.post("/auth/login", validateUser, userController.login);
router.post("/auth/logout", guard, userController.logout);
router.get("/current", guard, userController.currentUser);
router.patch(
  "/",
  guard,
  validateUserSubscription,
  userController.updateSubscription
);

module.exports = router;
