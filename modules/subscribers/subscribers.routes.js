const { Router } = require("express");
const {
  addSubscriber,
  getSubscriber,
  updateSubscriber,
  deleteSubscriber,
  getSubscribers,
} = require("./subscribers.controllers");

const router = Router();

router.post("/", addSubscriber);
router.get("/", getSubscribers);
router.get("/:uuid", getSubscriber);
router.patch("/:uuid", updateSubscriber);
router.delete("/:uuid", deleteSubscriber);

module.exports = router;
