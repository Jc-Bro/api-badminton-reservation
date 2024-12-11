const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const Reservation = require('../models/Reservation');

const schema = buildSchema(`
    type Slot {
        time: String
        isAvailable: Boolean
    }

    type Query {
        availableSlots(date: String!, terrain: String!): [Slot]
    }
`);

const root = {
    availableSlots: async ({ date, terrain }) => {
        const reservations = await Reservation.findAll({ where: { date, terrain } });
        const slots = [
            '10:00', '10:45', '11:30', // Exemple
        ].map(time => ({
            time,
            isAvailable: !reservations.some(r => r.time === time),
        }));
        return slots;
    },
};

module.exports = graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
});
