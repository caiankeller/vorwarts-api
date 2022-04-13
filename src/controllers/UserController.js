const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
require('dotenv').config()

// 90% built by copilot, it's incredible to how abstract he can be
module.exports = {
  async authenticationUser (req, res) {
    const { username, password } = req.query

    if (validator.isEmpty(username)) {
      return res.status(400).send({
        status: 400,
        ok: false,
        message: 'Username is required.'
      })
    }

    if (validator.isEmpty(password)) {
      return res.status(400).send({
        status: 400,
        ok: false,
        message: 'Password is required.'
      })
    }

    const user = await User.findOne({ username: username })

    if (!user) {
      return res.status(404).send({
        status: 404,
        ok: false,
        message: "User hasn't been found."
      })
    }

    bcrypt.compare(password, user.password, (er, same) => {
      if (!same) {
        return res.status(401).send({
          status: 401,
          ok: false,
          message: 'Invalid Password.'
        })
      }

      const { _id } = user

      const token = `Bearer ${jwt.sign(
        { _id },
        process.env.JSON_WEB_TOKEN_KEY,
        {
          expiresIn: 86400
        }
      )}`

      return res.status(200).send({
        status: 200,
        ok: true,
        message: 'user authenticated',
        token: token,
        username: user.username,
        email: user.email,
        name: user.name
      })
    })
  },
  async authorizationUser (req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).send({
        status: 401,
        ok: false,
        message: 'Token not provided.'
      })
    }

    const token = authorization.split(' ')[1]

    jwt.verify(token, process.env.JSON_WEB_TOKEN_KEY, (er, decoded) => {
      if (er) {
        return res.status(401).send({
          status: 401,
          ok: false,
          message: 'Token invalid.'
        })
      }

      User.findById(decoded._id, (er, user) => {
        if (er) {
          return res.status(400).send({
            status: 400,
            ok: false,
            message: 'An unexpected error has occurred.'
          })
        }

        if (!user) {
          return res.status(404).send({
            status: 404,
            ok: false,
            message: 'User not found.'
          })
        }

        req.user = user
        return next()
      })
    })
  },
  async createUser (req, res) {
    const { password, email } = req.body
    const username = req.body.username.toString().toLowerCase()

    if (validator.isEmpty(username)) {
      return res.status(400).send({
        status: 400,
        ok: false,
        message: 'Username is required.'
      })
    }

    if (validator.isEmpty(password)) {
      return res.status(400).send({
        status: 400,
        ok: false,
        message: 'Password is required.'
      })
    }

    if (validator.isLength(password, { min: 8, max: 32 })) {
      return res.status(400).send({
        status: 400,
        ok: false,
        message: 'Password must be between 8 and 32 characters.'
      })
    }

    if (validator.isEmpty(email) && !validator.isEmail(email)) {
      return res.status(400).send({
        status: 400,
        ok: false,
        message: 'Email is required.'
      })
    }

    const user = await User.findOne({ username: username })

    if (user) {
      return res.status(409).send({
        status: 409,
        ok: false,
        message: 'Username already exists.'
      })
    }

    bcrypt.hash(password, 10, async (er, hash) => {
      if (er) {
        return res.status(400).send({
          status: 400,
          ok: false,
          message: 'An unexpected error occured.'
        })
      }

      await User.create({
        username,
        password: hash,
        email
      })
        .then(() => {
          return res.status(201).send({
            status: 201,
            ok: true
          })
        })
        .catch(() =>
          res.status(400).send({
            status: 400,
            ok: false,
            message: 'An unexpected error occured.'
          })
        )
    })
  },
  async createToken (req, res) {
    const _id = req.user._id

    const token = `Bearer ${jwt.sign({ _id }, process.env.JSON_WEB_TOKEN_KEY, {
      expiresIn: 604800 // 1 week longer token
    })}`

    return res.status(201).send({
      status: 201,
      ok: true,
      token: token
    })
  }
}
