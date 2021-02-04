const User = require('../model/userModel');
const bcrypt = require('bcrypt');

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