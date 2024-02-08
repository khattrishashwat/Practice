const express = require('express');
const TimeEntry =require("../Model/time");
const router = express.Router();
router.post('/time', async (req, res) => {
    try {
      const { startTime, endTime, pauseTime } = req.body;
  
      const timeEntry = new TimeEntry({
        startTime,
        endTime,
        pauseTime,
      });
  
      await timeEntry.save();
  
      res.status(201).json({ message: 'Time entry stored successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });