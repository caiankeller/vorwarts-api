const User = require('../models/User')
const bcrypt = require('bcrypt')
const { jwt } = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    async authenticationUser(req, res) {
        const { username, password } = req.body

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
                message: 'user not found'
            })
        }

        console.log(password, user.password)

        bcrypt.compare(password, user.password).then((er, same) => {
            if (er) {
                return res.status(400).send({
                    status: 400,
                    ok: false,
                    message: er
                })
            }

            if (!same) {
                return res.status(401).send({
                    status: 401,
                    ok: false,
                    message: 'invalid password'
                })
            }

            const token = jwt.sign({ id: user._id }, process.env.JSON_WEB_TOKEN_KEY, {
                expiresIn: '1h'
            })

            return res.status(200).send({
                status: 200,
                ok: true,
                message: 'user authenticated',

            })
        })

    },
    async authorizationUser(req, res, next) {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).send({
                status: 401,
                ok: false,
                message: 'token not provided'
            })
        }

        const token = authorization.split(' ')[1]

        jwt.verify(token, process.env.JSON_WEB_TOKEN, (er, decoded) => {
            if (er) {
                return res.status(401).send({
                    status: 401,
                    ok: false,
                    message: 'token invalid'
                })
            }

            User.findById(decoded.id, (er, user) => {
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

                return next()
            })
        })
    },
    async createUser(req, res) {
        const { username, name, password, email } = req.body

        if (!username || !name || !password || !email) {
            return res.status(400).send({
                status: 400,
                ok: false,
                message: 'username, name, password or email is empty'
            })
        }

        bcrypt.hash(password, 10, async (er, hash) => {
            console.log(hash.length)

            await User.create({
                username,
                name,
                password: hash,
                email,
            }).then(() => {
                return res.status(201).send({
                    status: 201,
                    ok: true,
                })
            }).catch((er) => res.status(400).send({
                status: 400,
                ok: false,
                message: er
            })
            )
        })

    }
}