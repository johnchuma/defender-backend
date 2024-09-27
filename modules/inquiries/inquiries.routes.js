const { Router } = require("express");
const {
  addInquiry,
  getInquiry,
  updateInquiry,
  deleteInquiry,
  getInquiries,
} = require("./inquiries.controllers");

const router = Router();

router.post("/", addInquiry);
router.get("/", getInquiries);
router.get("/:uuid", getInquiry);
router.patch("/:uuid", updateInquiry);
router.delete("/:uuid", deleteInquiry);

module.exports = router;
