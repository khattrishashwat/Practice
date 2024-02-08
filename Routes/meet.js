const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Add this line to require the fs module

const Form = require("../model/form");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "uploads");

    // Create the 'uploads' directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

router.post("/submitForm", upload, async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      imagePath,
      caste,
      religion,
      profession,
      maritalStatus,
      profileCreatedBy,
      location,
    } = req.body;
    const existingForm = await Form.findOne({});
    const formData = {
      name,
      age,
      gender,
      caste,
      religion,
      profession,
      maritalStatus,
      profileCreatedBy,
      location,
      imagePath: req.file ? `/uploads/${req.file.filename}` : null,
    };
    console.log(formData);

    const form = new Form(formData);
    await form.save();

    res.status(200).json({ message: "Form submitted successfully!" , data: form });
  } catch (error) {
    console.error("Error processing form submission:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.get("/getForm", async (req, res) => {
  try {
    // const formId = req.query.formId;
    // const existingForm = await Form.findById({_id:formId});
    const _id = req.query._id;
    const existingForm = await Form.findById({_id});

    if (!existingForm) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.status(200).json({ data: existingForm });
    console.log(existingForm);
  } catch (error) {
    console.error("Error retrieving form data:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});


module.exports = router;
