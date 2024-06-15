const Post = require("../models/post");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const { post } = require("../routes/product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

exports.createPost = async (req, res) => {
  upload.array("photos", 10)(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "File upload error" });
    }
    console.log("req.files ===>", req.files);
    try {
      const {
        productSKU,
        productName,
        productDesc,
        unit,
        unitPrice,
        catagory,
        quantity
      } = req.body;
      const removeString = "..\\frontend\\public\\images\\";
      const images = req.files.map((file) => file.path.split(removeString)[1]);

      const newPost = new Post({
        productSKU,
        productName,
        productDesc,
        unit,
        unitPrice,
        catagory,
        images,
        quantity
      });

      await newPost.save();

      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(201).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);

    res.status(201).json("Post Deleted Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updatePost = async (req, res) => {
  upload.array("photos", 10)(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "File upload error" });
    }

    try {
      const {
        productSKU,
        productName,
        productDesc,
        unit,
        unitPrice,
        catagory,
      } = req.body;

      const { id } = req.params;
      const removeString = "..\\frontend\\public\\images\\";
      const images = req.files.map((file) => file.path.split(removeString)[1]);
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Append new photos to existing photos
      const newImages = post.images.concat(images);

      await Post.findByIdAndUpdate(id, {
        productSKU,
        productName,
        productDesc,
        unit,
        unitPrice,
        catagory,
        images: newImages,
      });

      res.status(200).json("Update Successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
};
