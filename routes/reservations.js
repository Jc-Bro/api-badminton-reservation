const express = require('express');
const Reservation = require('../models/Reservation');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const { date, time, terrain } = req.body;
    if (!req.user) return res.status(403).send('Not authenticated');

    const reservation = await Reservation.create({
        date,
        time,
        terrain,
        userId: req.user.id,
    });
    res.send(reservation);
});

router.get('/', async (req, res) => {
    const reservations = await Reservation.findAll();
    res.send(reservations);
});

module.exports = router;
