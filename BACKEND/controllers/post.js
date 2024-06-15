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

    try {
      const {
        productSKU,
        productName,
        productDesc,
        unit,
        unitPrice,
        catagory,
      } = req.body;
      const images = req.files.map((file) => file.path);

      const newPost = new Post({
        productSKU,
        productName,
        productDesc,
        unit,
        unitPrice,
        catagory,
        images,
      });

      await newPost.save();

      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
};
