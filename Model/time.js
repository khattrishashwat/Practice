const mongoose = require("mongoose");


const timeSchema = new mongoose.Schema({
  Type:{type:String},
    date: { type: Date, default: Date.now },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    pauseTime: { type: Number, default: 0 },
  });
  
  const TimeEntry = mongoose.model('TimeEntry', timeSchema);

  module.exports = TimeEntry;