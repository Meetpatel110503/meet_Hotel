const npmConstants = require("../Constant.js")
const User = require("../models/user")
const bcrypt = npmConstants.bcrypt
const jwt = npmConstants.jwt
const { createError } = require("../middleware/Error.js")
require("dotenv").config()

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the world's best hotel")
  } catch (error) {
    console.log(error)
  }
}

const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) return next(createError(303, "Email already exists."))
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const chash = bcrypt.hashSync(req.body.cpassword, salt)

    const newUser = new User({
      ...req.body,
      password: hash,
      cpassword: chash,
    })

    await newUser.save()
    res.status(200).send("User has been created.")
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
   
    if (!user) return next(createError(404, "User not found!"))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )
  
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or email!"))
    }

    const { password, ...otherDetails } = user._doc
    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    )

    res.status(200).json({
      message: "Login successful",
      token,
      details: { ...otherDetails },
    })
  } catch (err) {
    next(err)
  }
}

const getAllUser = async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {

    return res.status(400).json({ message: error })
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id
    await User.findByIdAndDelete(userId)
    res.status(200).send("User deleted successfully.")
  } catch (err) {
    next(err)
  }
}

module.exports = { home, register, login, getAllUser, deleteUser }
