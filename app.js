const express = require('express');
const routes = require('./routes');

require('dotenv').config();
require('./config/db');

const app = express();

app.use('/', routes.home);
app.use('/user', routes.user);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server listening on port: ' + port));