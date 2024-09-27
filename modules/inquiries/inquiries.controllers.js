const { Op } = require("sequelize");
const { Inquiry } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const getUrl = require("../../utils/get_url");

const findInquiryByUUID = async (uuid) => {
  try {
    const inquiry = await Inquiry.findOne({
      where: {
        uuid,
      },
    });
    return inquiry;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addInquiry = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    //add inquiry
    const response = await Inquiry.create({
      name,
      email,
      subject,
      message,
    });

    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getInquiries = async (req, res) => {
  try {
    const inquiry = await Inquiry.findAll();
    successResponse(res, inquiry);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getInquiry = async (req, res) => {
  try {
    const { uuid } = req.params;
    const inquiry = await findInquiryByUUID(uuid);
    successResponse(res, inquiry);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteInquiry = async (req, res) => {
  try {
    const { uuid } = req.params;
    const inquiry = await findInquiryByUUID(uuid);
    const response = await inquiry.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const updateInquiry = async (req, res) => {
  try {
    const { uuid } = req.params;
    const inquiry = await findInquiryByUUID(uuid);
    const response = await inquiry.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = {
  addInquiry,
  findInquiryByUUID,
  getInquiries,
  getInquiry,
  deleteInquiry,
  updateInquiry,
};
