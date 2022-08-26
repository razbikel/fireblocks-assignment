const express = require('express');
const { httpGetUsers } = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/', httpGetUsers)


module.exports = usersRouter;

