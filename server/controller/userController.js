const User = require("../models/user")
const bcrypt = require("bcryptjs")
const createError = require("../utils/Error.js")
require("dotenv").config()
const jwt = require("jsonwebtoken")

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to world best hotel ")
  } catch (error) {
    console.log(error)
  }
}

const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) return next(createError(303, "email already exists."))
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
      ...req.body,
      password: hash,
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

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    )

    const { password, isAdmin, ...otherDetails } = user._doc
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin })
  } catch (err) {
    next(err)
  }
}
const getAllUser = async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error })
  }
}
module.exports = { home, register, login, getAllUser }
