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
const { validateJWT } = require("../../utils/validateJWT");

const router = Router();

router.post("/", validateJWT, addOrder);
router.get("/user/:uuid", validateJWT, getUserOrders);
router.get("/pending/user/:uuid", validateJWT, getUserPendingOrders);
router.get("/delivered/user/:uuid", validateJWT, getUserDeliveredOrders);
router.get("/active", getPagination, getActiveOrders);
router.get("/previous", getPagination, getPreviousOrders);
router.get("/:uuid", validateJWT, getOrder);
router.patch("/:uuid", validateJWT, updateOrder);
router.delete("/:uuid", validateJWT, deleteOrder);

module.exports = router;
