const { Op } = require("sequelize");
const { OrderTracking, User } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const { findOrderByUUID } = require("../orders/orders.controllers");

const findOrderTrackingByUUID = async (uuid) => {
  try {
    const ordertracking = await OrderTracking.findOne({
      where: {
        uuid,
      },
    });
    return ordertracking;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addOrderTracking = async (req, res) => {
  try {
    const { order_uuid, stage } = req.body;
    const order = await findOrderByUUID(order_uuid);
    const orderTracking = await OrderTracking.findOne({
      where: {
        orderId: order.id,
      },
    });
    const response = await orderTracking.update({
      stage,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const findOrderTrackingByOrderUUID = async (req, res) => {
  try {
    const { uuid } = req.params;
    const order = await findOrderByUUID(uuid);
    const ordertracking = await OrderTracking.findAll({
      order: [["createdAt"]],
      where: {
        orderId: order.id,
      },
    });
    successResponse(res, ordertracking);
  } catch (error) {
    errorResponse(res, error);
    console.log(error);
    throw error;
  }
};
const deleteOrderTracking = async (req, res) => {
  try {
    const { uuid } = req.params;
    const ordertracking = await findOrderTrackingByUUID(uuid);
    const response = await ordertracking.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateOrderTracking = async (req, res) => {
  try {
    const { uuid } = req.params;
    const ordertracking = await findOrderTrackingByUUID(uuid);
    const response = await ordertracking.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  addOrderTracking,
  findOrderTrackingByUUID,
  findOrderTrackingByOrderUUID,
  deleteOrderTracking,
  updateOrderTracking,
};
