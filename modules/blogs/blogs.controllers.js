const { Op } = require("sequelize");
const { Blog } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const getUrl = require("../../utils/get_url");

const findBlogByUUID = async (uuid) => {
  try {
    const blog = await Blog.findOne({
      where: {
        uuid,
      },
    });
    return blog;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const image = await getUrl(req);

    //add blog
    const response = await Blog.create({
      title,
      image,
      description,
      category,
    });

    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getBlogs = async (req, res) => {
  try {
    const blog = await Blog.findAll();
    successResponse(res, blog);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getBlog = async (req, res) => {
  try {
    const { uuid } = req.params;
    const blog = await findBlogByUUID(uuid);
    successResponse(res, blog);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { uuid } = req.params;
    const blog = await findBlogByUUID(uuid);
    const response = await blog.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const updateBlog = async (req, res) => {
  try {
    const { uuid } = req.params;
    const blog = await findBlogByUUID(uuid);
    const response = await blog.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = {
  addBlog,
  findBlogByUUID,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
};
