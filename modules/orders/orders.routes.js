const { Router } = require("express");
const {
  addOrder,
  getActiveOrders,
  getPreviousOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
} = require("./orders.controllers");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", addOrder);
router.get("/user/:uuid", getUserOrders);
router.get("/active", getPagination, getActiveOrders);
router.get("/previous", getPagination, getPreviousOrders);
router.get("/:uuid", getOrder);
router.patch("/:uuid", updateOrder);
router.delete("/:uuid", deleteOrder);

module.exports = router;
