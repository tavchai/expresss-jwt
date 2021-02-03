const express = require('express');
const bodyParser = require('body-parser');
const db = require('./app/config/db');
const app = express();

// include routes
const routeUser = require('./app/route/userRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 5000



app.get('/', (req, res) => res.send('Hello World!'))
app.use('/users',routeUser);

app.listen(port, () => console.log(`Example app listening on ${port}!`));