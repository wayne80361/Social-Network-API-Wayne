const router = require("express").Router();

const {
  // important controller functions later **********
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/users
// GET all user route & POST to create one new user route
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:userId
// GET one user route & Update one user & DELETE one user route
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
// add a friend to a user's friend list & remove a friend from a user's friend list
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
