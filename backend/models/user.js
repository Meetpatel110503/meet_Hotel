const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    cpassword: { type: String, required: true },
    city: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const userModel = mongoose.model("users", userSchema)

module.exports = userModel
