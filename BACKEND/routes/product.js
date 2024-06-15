const router = require("express").Router();
const {
  createPost,
  getPosts,
  getPostById,
  deletePostById,
  updatePost,
} = require("../controllers/post");

router.route("/").post(createPost);
router.route("/").get(getPosts);
router.route("/:id").get(getPostById);
router.route("/:id").delete(deletePostById);
router.route("/:id").put(updatePost);

module.exports = router;
