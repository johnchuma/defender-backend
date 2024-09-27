const { Router } = require("express");
const {
  addBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
} = require("./blogs.controllers");

const router = Router();

router.post("/", addBlog);
router.get("/", getBlogs);
router.get("/:uuid", getBlog);
router.patch("/:uuid", updateBlog);
router.delete("/:uuid", deleteBlog);

module.exports = router;
