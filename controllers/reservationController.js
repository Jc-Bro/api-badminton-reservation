const Reservation = require('../models/Reservation');

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.status(500).send('Server error');
    }
    try {
        const reservations = await Reservation.findAll();
        const response = reservations.map(reservation => ({
            ...reservation.toJSON(),
            _links: {
                self: { href: `/reservations/${reservation.id}` },
                user: { href: `/users/${reservation.userId}` },
            },
        }));
        res.json(response);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

const createReservation = async (req, res) => {
    const { date, time, terrain } = req.body;

    try {
        const reservation = await Reservation.create({
            date,
            time,
            terrain,
            userId: req.user.id,
        });
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).send('Server error');
    }
};


module.exports = { getReservations, createReservation };
