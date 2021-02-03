
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

module.exports = User;