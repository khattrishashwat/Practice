const mongoose = require("mongoose");

const crftSchema = new mongoose.Schema({
    Complete:{
        type: String,
      },
    Refrence:{
        type: String,
      },
    Client:{
        type: String,
      },
    WorkLocation:{
        type: String,
      },
    Type:{
        type: String,
      },
    Description:{
        type: String,
      },
    Deadline:{
        type: String,
      },
    Responsible:{
        type: String,
      },
});

const Craft  = mongoose.model('Crft', crftSchema);
module.exports = Craft;