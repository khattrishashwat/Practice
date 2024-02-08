const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  age: {
    type: Number,
    
  },
  gender: {
    type: String,
    
  },
  image: {
    type: String,
  },
  caste: {
    type: String,
  },
  religion: {
    type: String,
  },
  profession: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  profileCreatedBy: {
    type: String,
  },
  location: {
    type: String,
  },
  imagePath: {
    type: String,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
