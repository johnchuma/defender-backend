const { Op } = require("sequelize");
const { User } = require("../../models");
const { generateJwtTokens } = require("../../utils/generateJwtTokens");
const { errorResponse, successResponse } = require("../../utils/responses");
const bcrypt = require("bcrypt");
const { randomNumber } = require("../../utils/random_number");
const { sendMail } = require("../../utils/mail_controller");
const { sendEmail } = require("../../utils/send_email");

const findUserByUUID = async (uuid) => {
  try {
    const user = await User.findOne({
      where: {
        uuid,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addUser = async (req, res) => {
  try {
    let { role, phone, name, email, password } = req.body;
    let user;
    user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      res.status(401).json({
        status: false,
        message: "User already exist",
      });
    } else {
      password = bcrypt.hashSync(password, 10);
      const response = await User.create({
        name,
        phone,
        password,
        email,
        role,
      });
      const tokens = generateJwtTokens(response);
      successResponse(res, { tokens: tokens });
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const loginWithGoogle = async (req, res) => {
  try {
    const { email, name } = req.body;
    let user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const tokens = generateJwtTokens(user);
      successResponse(res, { tokens: tokens });
    } else {
      user = await User.create({
        email,
        name,
      });
      const tokens = generateJwtTokens(user);
      successResponse(res, { tokens: tokens });
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      console.log(result);
      if (result) {
        const tokens = generateJwtTokens(user);
        res.status(200).json({
          body: {
            tokens,
          },
          status: true,
        });
      } else {
        res.status(401).send({
          status: false,
          message: "Wrong password",
        });
      }
    } else {
      res.status(404).send({ status: false, message: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await User.findAndCountAll({
      limit: req.limit,
      offset: req.offset,
      attributes: {
        exclude: ["id"],
      },
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getUserInfo = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await findUserByUUID(uuid);
    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error);
  }
};
const sendRecoveryCode = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const code = randomNumber();
      user = await user.update({
        recoveryCode: code,
      });
      const response = await sendEmail(user, "recovery-code");
      successResponse(res, response);
    } else {
      res.status(404).send({ status: false, message: "User does not exist" });
    }
  } catch (error) {
    errorResponse(res, error);
  }
};

const getMyInfo = async (req, res) => {
  try {
    const user = req.user;
    const response = await findUserByUUID(user.uuid);
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await findUserByUUID(uuid);
    const response = await user.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const resetPassword = async (req, res) => {
  try {
    let { recoveryCode, password } = req.body;
    const { email } = req.params;
    let user = await User.findOne({
      where: {
        email,
      },
    });
    if (user.recoveryCode == recoveryCode) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      user = await user.update({
        password: hashedPassword,
        recoveryCode: null,
      });
      successResponse(res, user);
    } else {
      res.status(401).send({
        status: false,
        message: "Invalid recovery code",
      });
    }
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    const user = await findUserByUUID(uuid);
    const response = await user.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = {
  addUser,
  findUserByUUID,
  getUsers,
  login,
  loginWithGoogle,
  deleteUser,
  getUserInfo,
  getMyInfo,
  updateUser,
  sendRecoveryCode,
  resetPassword,
};
