const { findUserByUUID } = require("../users/users.controllers");
const {
  Order,
  Sequelize,
  OrderProduct,
  OrderTracking,
} = require("../../models");
const { successResponse, errorResponse } = require("../../utils/responses");

const getClientStats = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await findUserByUUID(uuid);
    const orders = await Order.findAll({
      where: {
        userId: user.id,
      },
      include: [
        {
          model: OrderProduct,
        },
      ],
      // Group by Order id to aggregate correctly
    });
    let totalOrders = orders.length;
    let orderedItems = orders.reduce(
      (prev, item) => item.OrderProducts.length + prev,
      0
    );
    let deliveredItems = orders
      .filter((item) => !item.isActive)
      .reduce((prev, item) => item.OrderProducts.length + prev, 0);
    let totalPayments = orders.reduce(
      (prev, item) =>
        item.OrderProducts.reduce(
          (prev, product) => product.count * product.price,
          0
        ) + prev,
      0
    );

    successResponse(res, {
      totalOrders,
      orderedItems,
      deliveredItems,
      totalPayments,
    });
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = { getClientStats };
