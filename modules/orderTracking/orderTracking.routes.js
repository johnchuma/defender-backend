const { Router } = require("express");

const {
  addOrderTracking,
  findOrderTrackingByUUID,
  updateOrderTracking,
  deleteOrderTracking,
  findOrderTrackingByOrderUUID,
} = require("./orderTracking.controllers");

const router = Router();

router.post("/", addOrderTracking);
router.get("/order/:uuid", findOrderTrackingByOrderUUID);
router.patch("/:uuid", updateOrderTracking);
router.delete("/:uuid", deleteOrderTracking);

module.exports = router;
