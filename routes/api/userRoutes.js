const router = require("express").Router();

const {
  // important controller functions later **********
  getUsers,
  createUser,
  getSingleUser,
  deleteUser,
} = require("../../controllers/userController");

// /api/users
// GET all user route & POST to create one new user route
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
// GET one user route & DELETE one user route
router.route("/:userId").get(getSingleUser).delete(deleteUser);

module.exports = router;
