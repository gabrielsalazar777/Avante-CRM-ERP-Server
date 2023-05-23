const express = require("express");
const router = express.Router();

const fileUploader = require("../middleware/cloudinary")

router.post('/', fileUploader.single("image"), (req, res, next) => {

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    console.log("this is file", req.file)
    res.json({ image: req.file.path });

  })

module.exports = router;
