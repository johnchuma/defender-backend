const { Router } = require("express");
const {
  addBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  getFeaturedBlogs,
} = require("./blogs.controllers");
const upload = require("../../utils/upload");
const { getPagination } = require("../../utils/getPagination");

const router = Router();

router.post("/", upload.single("file"), addBlog);
router.get("/", getPagination, getBlogs);
router.get("/featured", getFeaturedBlogs);
router.get("/:uuid", getBlog);
router.patch("/:uuid", updateBlog);
router.delete("/:uuid", deleteBlog);

module.exports = router;
