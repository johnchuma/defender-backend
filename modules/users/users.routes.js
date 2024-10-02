const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addUser,
  login,
  getUsers,
  getMyInfo,
  getUserInfo,
  updateUser,
  deleteUser,
  loginWithGoogle,
  sendRecoveryCode,
  resetPassword,
} = require("./users.controllers");
const router = Router();

router.post("/", addUser);
router.post("/auth/google", loginWithGoogle);
router.post("/auth/login", login);
router.post("/auth/send-recovery-code", sendRecoveryCode);
router.post("/auth/reset-password/:email", resetPassword);
router.get("/", validateJWT, getUsers);
router.get("/me", validateJWT, getMyInfo);
router.get("/:uuid", validateJWT, getUserInfo);
router.patch("/:uuid", validateJWT, updateUser);
router.delete("/:uuid", validateJWT, deleteUser);

module.exports = router;
