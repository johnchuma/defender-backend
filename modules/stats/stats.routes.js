const { Router } = require("express");
const { getClientStats } = require("./stats.controllers");
const { validateJWT } = require("../../utils/validateJWT");
const router = Router();
router.get("/user/:uuid", validateJWT, getClientStats);
module.exports = router;
