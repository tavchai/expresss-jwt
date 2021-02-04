
const db = require('../config/db');

const User = function (user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.createAt = new Date();
    this.updateAt = new Date();
}

User.create = (newuser, result) => {
    var sql = `INSERT INTO users SET ?`;
    db.query(sql, newuser, (err, res) => {
        if (err) {
            result(null, err);
        }

        result(null, { id: res.insertId, ...newuser });
    });
}

User.findAll = result => {
    var sql = `SELECT * FROM users`;
    db.query(sql, (err, res) => {
        if (err) {
            result(null, err);
        }

        return result(null, res);

    });
}

User.findByEmail = (email, result) => {
    var sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, res) => {
        if (err) {
            result(null, err);
        }

        if (res.length) return result(null, res[0]);

        result({ email: "email not found" }, null);
    });
}


module.exports = User;