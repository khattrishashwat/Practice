const express = require("express");
const Craft =require("../Model/crft");
const router = express.Router();
router.post("/craft", async (req, res) => {
    try {
      const newCraft = new Craft(req.body);
      const savedCraft = await newCraft.save();
      res.status(201).json(savedCraft);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
router.get("/craft", async (req, res) => {
    try {
      const crafts = await Craft.find();
      res.status(200).json(crafts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  module.exports = router;