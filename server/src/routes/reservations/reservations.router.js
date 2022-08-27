const express = require('express');
const { httpGetReservations, httpAddReservations } = require('./reservations.controller');

const reservationsRouter = express.Router();

reservationsRouter.post('/get-reservations', httpGetReservations)

reservationsRouter.post('/add-reservation', httpAddReservations)



module.exports = reservationsRouter;

