const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  toggleLikePost,
} = require("../controllers/postController");
const fileUpload = require("../middlewares/fileUpload");
const checkAuth = require("../middlewares/checkAuth");

router.get("/", checkAuth, getAllPosts);
router.get("/:id", checkAuth, getPostById);
router.post("/create", checkAuth, fileUpload, createPost);
router.put("/update/:id", checkAuth, updatePost);
router.delete("/delete/:id", checkAuth, deletePost);
router.post("/:id/like", checkAuth, toggleLikePost);

module.exports = router;
