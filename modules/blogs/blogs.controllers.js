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
    const { category } = req.query;
    let options = {};
    if (category) {
      options.category = category;
    }
    const response = await Blog.findAndCountAll({
      limit: req.limit,
      order: [["createdAt", "DESC"]],
      offset: req.offset,
      where: options,
    });
    successResponse(res, {
      count: response.count,
      page: req.page,
      blogs: response.rows,
    });
  } catch (error) {
    errorResponse(res, error);
  }
};
const getFeaturedBlogs = async (req, res) => {
  try {
    const response = await Blog.findAll({
      where: {
        isFeatured: true,
      },
      limit: 3,
    });
    successResponse(res, response);
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
  getFeaturedBlogs,
  deleteBlog,
  updateBlog,
};
