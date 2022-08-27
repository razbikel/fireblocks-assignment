const express = require('express');
const { httpGetReservations, httpAddReservations, httpDeleteReservations } = require('./reservations.controller');

const reservationsRouter = express.Router();

reservationsRouter.post('/get-reservations', httpGetReservations)

reservationsRouter.post('/add-reservation', httpAddReservations)

reservationsRouter.post('/delete-reservation', httpDeleteReservations)

module.exports = reservationsRouter;

