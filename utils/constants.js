const internalError = (error) => {
  res.status(500).json({
    status: false,
    message: "Internal server error",
    error: error,
  });
};
const orderStages = [
  "Order Placement",
  "Order Confirmation",
  "Order Processing",
  "Order Packaging",
  "Shipping",
  "In Transit",
  "Out for Delivery",
  "Order Delivery",
  "Delivery Confirmation",
  "Return or Exchange",
];

const monthsNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const successResponse = (data) => {
  res.status(200).json({
    status: true,
    data: data,
  });
};
module.exports = {
  internalError,
  orderStages,
  successResponse,
};
