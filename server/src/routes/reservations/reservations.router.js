const express = require('express');
const { httpGetReservations, httpAddReservations } = require('./reservations.controller');

const reservationsRouter = express.Router();

reservationsRouter.get('/', httpGetReservations)

reservationsRouter.post('/', httpAddReservations)



module.exports = reservationsRouter;

