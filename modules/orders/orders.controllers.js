const { Op } = require("sequelize");
const { Order, OrderProduct, OrderTracking, User } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const { findUserByUUID } = require("../users/users.controllers");
const { orderStages } = require("../../utils/constants");

const findOrderByUUID = async (uuid) => {
  try {
    const order = await Order.findOne({
      where: {
        uuid,
      },
    });
    return order;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addOrder = async (req, res) => {
  try {
    const {
      withDelivery,
      country,
      region,
      district,
      address,
      user_uuid,
      products,
    } = req.body;
    const user = await findUserByUUID(user_uuid);
    const order = await Order.create({
      withDelivery,
      country,
      region,
      address,
      status: "",
      district,
      userId: user.id,
    });
    console.log("order id", order.id);
    const promises = products.map(async (item) => {
      return await OrderProduct.create({
        product: item.product,
        orderId: order.id,
        count: item.count,
        color: item.color,
        price: item.price,
      });
    });
    const trackingPromises = orderStages.map(async (item, index) => {
      if (index < 2) {
        return await OrderTracking.create({
          orderId: order.id,
          stage: item,
        });
      }
    });
    await Promise.all(promises);
    await Promise.all(trackingPromises);

    successResponse(res, order);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getActiveOrders = async (req, res) => {
  try {
    const response = await Order.findAndCountAll({
      limit: req.limit || 8,
      order: [["createdAt", "DESC"]],
      offset: req.offset || 0,
      include: [
        {
          model: User,
          where: {
            name: {
              [Op.like]: `%${req.keyword || ""}%`,
            },
          },
        },
      ],
      where: {
        isActive: true,
      },
    });
    successResponse(res, {
      count: response.count,
      page: req.page,
      orders: response.rows,
    });
  } catch (error) {
    errorResponse(res, error);
  }
};
const getPreviousOrders = async (req, res) => {
  try {
    const response = await Order.findAndCountAll({
      limit: req.limit || 8,
      order: [["createdAt", "DESC"]],
      offset: req.offset || 0,
      include: [
        {
          model: User,
          where: {
            name: {
              [Op.like]: `%${req.keyword || ""}%`,
            },
          },
        },
      ],
      where: {
        isActive: false,
      },
    });
    successResponse(res, {
      count: response.count,
      page: req.page,
      orders: response.rows,
    });
  } catch (error) {
    errorResponse(res, error);
  }
};
const getUserOrders = async (req, res) => {
  try {
    const { uuid } = req.params;
    const response = await Order.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          where: {
            uuid,
          },
        },
      ],
    });

    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getOrder = async (req, res) => {
  try {
    const { uuid } = req.params;
    const order = await Order.findOne({
      where: {
        uuid,
      },
      include: [User, OrderProduct, OrderTracking],
    });
    successResponse(res, order);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { uuid } = req.params;
    const order = await findOrderByUUID(uuid);
    const response = await order.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const updateOrder = async (req, res) => {
  try {
    const { uuid } = req.params;
    const order = await findOrderByUUID(uuid);
    const response = await order.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = {
  addOrder,
  findOrderByUUID,
  getActiveOrders,
  getPreviousOrders,
  getUserOrders,
  getOrder,
  deleteOrder,
  updateOrder,
};
