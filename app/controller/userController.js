const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// create User 
exports.create = (req, res, next) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then((hash) => {
            const newuser = new User({
                username: username,
                email: email,
                password: hash,
            });

            User.create(newuser, (err, data) => {
                if (err) {
                    res.status(500)
                        .json({
                            message: err
                        });
                }

                res.status(201)
                    .json({
                        data: data
                    });
            });
        })
        .catch((err) => {
            res.status(500)
                .json({
                    message: "Create fail"
                });
        });
}

// find userAll 
exports.findAll = (req, res) => {
    User.findAll((err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err
                });
        }
        res.status(201)
            .json({
                data: data
            });
    });
}

// userByEmailfind 
exports.findByEmail = (req, res) => {
    const { email } = req.body;
    User.findByEmail(email, (err, data) => {
        if (err) {
            res.status(500)
                .json({
                    message: err
                });
        }
        res.status(201)
            .json({
                data: data
            });
    })
}

//auth userlogin
exports.authLoginUser = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, (err, data) => {
        if (err) {
            res.status(401)
                .json({
                    message: "Authentication failed",
                    err: err
                })
        }
        // console.log(password);
        // console.log(data.password);
        if (data) {
            bcrypt.compare(password, data.password, (err, result) => {
                if (err) {
                    res.status(401)
                        .json({
                            message: "Authentication failed",
                            err: err
                        })
                }
                if (!result) {
                    res.status(401)
                        .json({
                            message: "Authentication failed Password not Compare"
                        })
                } else {
                    let jwtToken = jwt.sign({
                        email: data.email,
                        userId: data.id
                    },
                        "create-authen-nodejs", {
                        expiresIn: "1h"
                    });
                    res.status(200).json({
                        token: jwtToken,
                        expiresIn: 3600,
                    });
                }
            })

        } else {
            res.status(401)
                .json({
                    message: "email not found"
                })
        }
    })
}