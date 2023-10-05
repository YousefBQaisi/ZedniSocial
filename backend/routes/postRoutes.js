const express = require("express");
const { requireSignIn } = require("../controllers/userControllers");
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
} = require("../controllers/postControllers");

//router object
const router = express.Router();

//CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);

//GET ALL POSTs
router.get("/get-all-post", getAllPostsController);

//GET User POSTs
router.get("/get-user-post", requireSignIn, getUserPostsController);

//DELETE POST
router.delete("/delete-post/:id", requireSignIn, deletePostController);

//UPDATE POST
router.put("/update-post/:id", requireSignIn, updatePostController);

//exports
module.exports = router;
