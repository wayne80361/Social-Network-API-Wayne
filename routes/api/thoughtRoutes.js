const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
// GET all thoughts route & POST to create one thought route
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
// GET one thought & Update one thought & DELETE one thought routes
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// POST one reaction to a thoughtId
router.route("/:thoughtId/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
// DELETE one reaction from a thoughtId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
