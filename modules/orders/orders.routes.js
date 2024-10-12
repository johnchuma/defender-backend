const { Router } = require("express");
const {
  addOrder,
  getActiveOrders,
  getPreviousOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getUserPendingOrders,
  getUserDeliveredOrders,
} = require("./orders.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", addOrder);
router.get("/user/:uuid", getUserOrders);
router.get("/pending/user/:uuid", getUserPendingOrders);
router.get("/delivered/user/:uuid", getUserDeliveredOrders);
router.get("/active", getPagination, getActiveOrders);
router.get("/previous", getPagination, getPreviousOrders);
router.get("/:uuid", getOrder);
router.patch("/:uuid", updateOrder);
router.delete("/:uuid", deleteOrder);

module.exports = router;
