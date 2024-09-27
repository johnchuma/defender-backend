const { Op } = require("sequelize");
const { Subscriber } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const getUrl = require("../../utils/get_url");

const findSubscriberByUUID = async (uuid) => {
  try {
    const subscriber = await Subscriber.findOne({
      where: {
        uuid,
      },
    });
    return subscriber;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;
    const subscriber = await Subscriber.findOne({
      where: {
        email,
      },
    });
    if (subscriber) {
      res.status(403).json({
        status: false,
        message: "Already subscribed",
      });
    } else {
      const response = await Subscriber.create({
        email,
      });
      successResponse(res, response);
    }
  } catch (error) {
    errorResponse(res, error);
  }
};
const getSubscribers = async (req, res) => {
  try {
    const subscriber = await Subscriber.findAll();
    successResponse(res, subscriber);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getSubscriber = async (req, res) => {
  try {
    const { uuid } = req.params;
    const subscriber = await findSubscriberByUUID(uuid);
    successResponse(res, subscriber);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteSubscriber = async (req, res) => {
  try {
    const { uuid } = req.params;
    const subscriber = await findSubscriberByUUID(uuid);
    const response = await subscriber.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const updateSubscriber = async (req, res) => {
  try {
    const { uuid } = req.params;
    const subscriber = await findSubscriberByUUID(uuid);
    const response = await subscriber.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = {
  addSubscriber,
  findSubscriberByUUID,
  getSubscribers,
  getSubscriber,
  deleteSubscriber,
  updateSubscriber,
};
