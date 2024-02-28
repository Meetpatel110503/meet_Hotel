const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    phone: { 
      type: String, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    cpassword: { 
      type: String, 
      required: true 
    },
    city: { 
      type: String 
    },
    isAdmin: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true }
)

const User =new mongoose.model("User", userSchema)

module.exports = User
