const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

// 95% built by copilot :D
module.exports = {
  async authenticationUser (req, res) {
    const { username, password } = req.query

    if (!username || !password) {
      return res.status(400).send({
        status: 400,
        ok: false,
        message: 'username or password is empty'
      })
    }

    const user = await User.findOne({ username: username })

    if (!user) {
      return res.status(404).send({
        status: 404,
        ok: false,
        message: 'User hasn\'t been found'
      })
    }

    bcrypt.compare(password, user.password, (er, same) => {
      if (!same) {
        return res.status(401).send({
          status: 401,
          ok: false,
          message: 'Invalid Password'
        })
      }

      const { _id } = user

      const token = `Bearer ${jwt.sign({ _id }, process.env.JSON_WEB_TOKEN_KEY, {
        expiresIn: 86400
      })}`

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
        message: 'token not provided'
      })
    }

    const token = authorization.split(' ')[1]

    jwt.verify(token, process.env.JSON_WEB_TOKEN_KEY, (er, decoded) => {
      if (er) {
        return res.status(401).send({
          status: 401,
          ok: false,
          message: 'token invalid'
        })
      }

      User.findById(decoded._id, (er, user) => {
        if (er) {
          return res.status(400).send({
            status: 400,
            ok: false,
            message: 'an error occured in the request'
          })
        }

        if (!user) {
          return res.status(404).send({
            status: 404,
            ok: false,
            message: 'user not found'
          })
        }

        req.user = user
        return next()
      })
    })
  },
  async createUser (req, res) {
    const { username, password, email } = req.body
    console.log(username, password, email)

    if (!username || !password || !email) {
      return res.status(400).send({
        status: 400,
        ok: false,
        message: 'Username, password or email is empty'
      })
    }

    bcrypt.hash(password, 10, async (er, hash) => {
      if (er) {
        return res.status(400).send({
          status: 400,
          ok: false,
          message: 'An unexpected error occured'
        })
      }

      await User.create({
        username,
        password: hash,
        email
      }).then(() => {
        return res.status(201).send({
          status: 201,
          ok: true
        })
      }).catch((er) => res.status(400).send({
        status: 400,
        ok: false,
        message: 'An unexpected error occured'
      })
      )
    })
  }
}
