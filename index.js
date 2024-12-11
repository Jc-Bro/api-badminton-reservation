// Importer Express et les routes
const express = require('express');
const authRoutes = require('./routes/auth'); // Routes pour l'authentification
const reservationRoutes = require('./routes/reservations'); // Routes pour les réservations
const sequelize = require('./models'); // Configuration Sequelize
const swaggerUi = require('swagger-ui-express'); // Configuration swagger
const fs = require('fs');
const yaml = require('yaml');


// Initialisation de l'application
const app = express();

// Charger le fichier YAML
const apiDoc = yaml.parse(fs.readFileSync('./api-doc.yaml', 'utf8'));


// Route Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc));


// Middleware Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc));

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Route pour la racine
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API de réservation de terrains de badminton !');
});

// Déclaration des autres routes
app.use('/auth', authRoutes);
app.use('/reservations', reservationRoutes);

// Connexion à la base de données et démarrage du serveur
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de données connectée avec succès');
        app.listen(3000, () => {
            console.log('Le serveur tourne sur http://localhost:3000');
            console.log('Swagger docs available at http://localhost:3000/api-docs');
        });
    })
    .catch((error) => {
        console.error('Erreur de connexion à la base de données :', error);
    });
