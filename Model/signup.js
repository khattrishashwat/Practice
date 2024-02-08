const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{ 
        type:String,
        unique:true,
        required:[true,'Please provide a Username']  
    },
    email:{ 
        type:String,
        unique:true,
    },
    password:{ 
        type:String,   
    },
    phoneNumber:{ 
        type:String,
        unique:true,  
    }
  });
  userSchema.methods.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error(error);
    }
  };

  const User = mongoose.model('User', userSchema);

module.exports = User;