const Post = require("../models/post");

const createPost = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const { description, location, tags } = req.body;

    if (!req.file)
      return res
        .status(400)
        .json({ error: "Can't post without attachment of file" });

    if (!tags || tags == "")
      return res.status(400).json({ error: "Tag is required" });

    const mediaURL = req.file.filename;

    let type;
    if (req.file.mimetype.startsWith("image/")) type = "photo";
    else if (req.file.mimetype.startsWith("video/")) type = "video";
    else return res.status(400).json({ error: "Unsupported file type" });

    const newPost = new Post({
      userId,
      description,
      location,
      tags: tags.split(","),
      type,
      mediaURL,
    });

    const savedPost = await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (err) {
    res.status(500).json({ error: "Failed to create the post" });
  }
};
// const createPost = async (req, res) => {
//   try {
//     const userId = req.userData.userId;
//     const { description, location, tags } = req.body;

//     if (!req.file)
//       return res
//         .status(400)
//         .json({ error: "Can't post without attachment of file" });

//     if (!tags || tags == "")
//       return res.status(400).json({ error: "Tag is required" });

//     const mediaURL = req.file.filename;

//     let type;
//     if (req.file.mimetype.startsWith("image/")) type = "photo";
//     else if (req.file.mimetype.startsWith("video/")) type = "video";
//     else return res.status(400).json({ error: "Unsupported file type" });

//     const newPost = new Post({
//       userId,
//       description,
//       location,
//       tags: tags.split(","),
//       type,
//       mediaURL,
//     });

//     const savedPost = await newPost.save();

//     res
//       .status(201)
//       .json({ message: "Post created successfully", post: savedPost });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to create the post" });
//   }
// };

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    console.log(post);

    if (!post) return res.status(404).json({ error: "Post not found" });

    // getting the total likes count
    const likeCount = post.likes.length;

    const postWithLikeInfo = {
      ...post._doc,
      likeCount,
    };

    res.status(200).json({ post: postWithLikeInfo });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch the post" });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userData.userId;

    let post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.userId.toString() !== userId)
      return res
        .status(403)
        .json({ error: "You are not authorized to update this post" });

    const { description, location, tags } = req.body;

    // update only if there's a change
    if (!tags || tags == "")
      return res.status(400).json({ error: "Tag cannot be empty" });
    else if (post.tags.toString() != tags) post.tags = tags.split(",");

    if (description && post.description != description)
      post.description = description;

    if (location && post.location != location) post.location = location;

    post = await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (err) {
    res.status(500).json({ error: "Failed to update the post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userData.userId;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    console.log(postId);

    if (post.userId.toString() !== userId)
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post" });

    await post.deleteOne({ _id: postId });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete the post" });
  }
};

const toggleLikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userData.userId;

    let post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const isLiked = post.likes.includes(userId);

    if (isLiked) post.likes.pull(userId);
    else post.likes.push(userId);

    post = await post.save();

    res.status(200).json({ message: "Post like status updated", post });
  } catch (err) {
    res.status(500).json({ error: "Failed to update the post like status" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLikePost,
};
