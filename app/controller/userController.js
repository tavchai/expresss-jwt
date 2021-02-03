const User = require('../model/userModel');
const bcrypt = require('bcrypt');

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